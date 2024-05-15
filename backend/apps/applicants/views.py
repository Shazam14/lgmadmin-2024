import os
from django.core.mail import EmailMessage
from django.db import transaction
from rest_framework import status
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Applicant
from .serializers import ApplicantSerializer
from rest_framework.views import APIView
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken
from apps.applicants.models import Applicant
from apps.students.models import Student
from apps.parents.models import Parent
from apps.enrollments.models import Enrollment
from apps.applicants.utils.utils import (
    get_program_based_on_applicant,
    generate_unique_student_id,
)
from datetime import timedelta
import logging

logger = logging.getLogger(__name__)


class ApplicantViewSet(viewsets.ModelViewSet):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer
    permission_classes = [IsAuthenticated]


class ApplicantApprovalView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, applicant_id):
        new_status = request.data.get("status", None)
        if new_status not in ["Pending", "Approved", "Rejected"]:
            return JsonResponse(
                {"error": "Invalid status provided"}, status=status.HTTP_400_BAD_REQUEST
            )

        applicant = get_object_or_404(Applicant, id=applicant_id)

        with transaction.atomic():
            applicant.status = new_status
            applicant.save()

            if new_status == "Approved":
                enrollment_successful, message = self.handle_enrollment(
                    applicant)
                if not enrollment_successful:
                    return JsonResponse(
                        {"error": message}, status=status.HTTP_409_CONFLICT
                    )

            elif new_status == "Rejected":
                self.handle_rejection(applicant)

            elif new_status == "Pending":
                self.handle_pending_status(applicant)

        return JsonResponse(
            {"status": "success", "message": f"Applicant {new_status} and notified."}
        )

    def handle_enrollment(self, applicant):
        print(f"Handling enrollment for applicant: {applicant}")

        if Student.objects.filter(applicant=applicant).exists():
            logger.debug(
                "Student already enrolled for applicant ID: {}".format(
                    applicant.id)
            )
            return False, "Student already enrolled"

        student, created = Student.objects.get_or_create(
            applicant=applicant,
            defaults={
                "first_name": applicant.first_name,
                "middle_name": applicant.middle_name or "",
                "last_name": applicant.last_name,
                "gender": applicant.gender,
                "age": int(round(applicant.age)),
                "birthday": applicant.birthday,
                "email": applicant.email,
                "student_id": generate_unique_student_id(),
                "student_status": "Active",
                "grade": "10",  # Default value, adjust as necessary
                "section": "A",  # Default value, adjust as necessary
                "tuition_status": "U",  # Default to 'Unsettled'
                "account_status": "A",  # Default to 'Active'
                "program": get_program_based_on_applicant(applicant),
                "promoted": False,
                "elementary_certificate": False,
                "junior_high_certificate": False,
                "attendance_percentage": 0.0,
            },
        )
        logger.debug("Created student ID: {}".format(student.id))
        print(f"Student created: {created}")

        if created:
            self.setup_student_courses(student)
            self.send_welcome_email(student)

            # Generate the enrollment link
            enrollment_link = self.generate_enrollment_link(student)
            print(f"Enrollment link here we go LINE 104: {enrollment_link}")

            # Prepare email content with the link
            email_subject = "Application Approved"
            email_body = f"""
            Dear {applicant.parent.first_name} {applicant.parent.last_name},
            Your application for {applicant.first_name} {applicant.last_name} has been approved.
            Please complete your enrollment by following this link: {enrollment_link}
            """
            print(f"Email subject: {email_subject}")
            print(f"Email body: {email_body}")

            result, body = self.send_mail(
                applicant.parent.email, email_subject, email_body)
            print(f"Email send result: {result}")
            print(f"Returned email body: {body}")

            if result:
                print("Email sent successfully")
                return True, "Enrollment successful"
            else:
                error_message = body or "Failed to send email"
                print("Failed to send email")
                return False, error_message
        else:
            print("Student already enrolled")
            return False, "Student already enrolled"

    def generate_enrollment_link(self, student):
        refresh = RefreshToken.for_user(student)
        # Set a custom expiration time for the token
        refresh.set_exp(lifetime=timedelta(hours=24))  # Expires in 24 hours
        token = str(refresh.access_token)
        return f"https://example.com/enrollment/{student.id}/?ytoken={token}"

    def send_mail(self, to_email, subject, body):
        print(f"FROM VIEWS. PY--->Sending email to: {to_email}")
        print(f"Subject: {subject}")
        print(f"Body VIEWS: {body}")
        try:
            email = EmailMessage(
                subject=subject,
                body=body,
                from_email="no-reply@learninggardenmontessori.ph",
                to=[to_email]
            )
            print(f"Email object created: {email}")
            email.send()
            print("Email sent successfully")
            return True, body  # Return the email body
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
            return False, None  # Re-raise the exception

    def handle_rejection(self, applicant):
        # Example of handling rejection
        email_subject = "Application Rejected"
        email_body = f"Dear {applicant.parent.first_name}, we regret to inform you that your application has been rejected."
        self.send_mail(applicant.email, email_subject, email_body)

    def handle_pending_status(self, applicant):
        # Example of handling pending status
        email_subject = "Application Pending"
        email_body = f"Dear {applicant.parent.first_name}, your application is currently under review."
        self.send_mail(applicant.email, email_subject, email_body)

    def setup_student_courses(self, student):
        # Add logic to assign courses to the student
        # For example:
        # courses = get_default_courses_for_program(student.program)
        # for course in courses:
        #     Enrollment.objects.create(student=student, course=course)
        pass

    def send_welcome_email(self, student):
        subject = "Welcome to Learning Garden Montessori School"
        body = f"""
        Dear {student.first_name} {student.last_name},

        Welcome to Learning Garden Montessori School! We are excited to have you with us.

        Your enrollment has been successfully processed. Here are your details:

        Student ID: {student.student_id}
        Program: {student.program.name}
        Grade: {student.grade}
        Section: {student.section}

        Please keep this information safe.

        Best regards,
        Learning Garden Montessori School
        """
        try:
            email = EmailMessage(
                subject=subject,
                body=body,
                from_email="no-reply@learninggardenmontessori.ph",
                to=[student.email],
            )
            email.send()
        except Exception as e:
            logger.error(f"Failed to send welcome email: {str(e)}")
