import os
from django.core.mail import EmailMessage
from django.db import transaction
from rest_framework import status
from rest_framework import viewsets
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
from apps.applicants.utils.utils import get_program_based_on_applicant, generate_unique_student_id
from datetime import timedelta
import logging

logger = logging.getLogger(__name__)


class ApplicantViewSet(viewsets.ModelViewSet):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer


class ApplicantApprovalView(APIView):
    def post(self, request, applicant_id):
        new_status = request.data.get('status', None)
        if new_status not in ['Pending', 'Approved', 'Rejected']:
            return JsonResponse({'error': 'Invalid status provided'}, status=status.HTTP_400_BAD_REQUEST)

        applicant = get_object_or_404(Applicant, id=applicant_id)

        with transaction.atomic():
            applicant.status = new_status
            applicant.save()

            if new_status == 'Approved':
                if not Student.objects.filter(applicant=applicant).exists():
                    student = Student.objects.create(
                        applicant=applicant,
                        first_name=applicant.first_name,
                        last_name=applicant.last_name,
                        middle_name=applicant.middle_name if applicant.middle_name else '',
                        gender=applicant.gender,
                        age=int(round(applicant.age)),
                        birthday=applicant.birthday,
                        email=applicant.email,
                        program=get_program_based_on_applicant(applicant),
                        student_id=generate_unique_student_id(),
                        student_status='Active',
                        tuition_status='Unsettled',
                        account_status='Active',
                        grade="10",
                        section="A",
                    )
                    # Enrollment creation here
                    # Assuming there's a function to create and handle enrollments
                    self.handle_enrollment(student)

                    # Generate the enrollment link
                    enrollment_link = self.generate_enrollment_link(student)

                    # Prepare email content with the link
                    email_subject = "Application Approved"
                    email_body = f"""
                        Dear {applicant.parent.first_name} {applicant.parent.last_name},
                        Your application for {applicant.first_name} {applicant.last_name} has been approved.
                        Please complete your enrollment by following this link: {enrollment_link}
                    """
                    self.send_mail(applicant.email, email_subject, email_body)
                else:
                    return JsonResponse({'error': 'Student record already exists for this applicant'}, status=status.HTTP_409_CONFLICT)

            elif new_status == 'Rejected':
                self.handle_rejection(applicant)

            elif new_status == 'Pending':
                self.handle_pending_status(applicant)

        return JsonResponse({'status': 'success', 'message': f'Applicant {new_status} and notified.'})

    def generate_enrollment_link(self, student):
        refresh = RefreshToken.for_user(student)
        # Set a custom expiration time for the token
        refresh.set_exp(lifetime=timedelta(hours=24))  # Expires in 24 hours
        token = str(refresh.access_token)
        return f"https://example.com/enrollment/{student.id}/?ytoken={token}"

    def send_mail(self, to_email, subject, body):
        try:
            email = EmailMessage(
                subject=subject,
                body=body,
                from_email='no-reply@learninggardenmontessori.ph',
                to=[to_email]
            )
            email.send()
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")

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


""" class ApplicantApprovalView(APIView):
    def post(self, request, applicant_id):
        new_status = request.data.get('status', None)
        if new_status not in ['Pending', 'Approved', 'Rejected']:
            return JsonResponse({'error': 'Invalid status provided'}, status=status.HTTP_400_BAD_REQUEST)

        applicant = get_object_or_404(Applicant, id=applicant_id)

        # Handling email recipients from environment variables
        cc_list = os.getenv('EMAIL_CC', '').split(',')
        bcc_list = os.getenv('EMAIL_BCC', '').split(',')

        with transaction.atomic():
            applicant.status = new_status
            applicant.save()

            email_subject = ""
            email_body = ""

            if new_status == 'Approved':
                student = Student.objects.create(
                    applicant=applicant,
                    first_name=applicant.first_name,
                    last_name=applicant.last_name,
                    # Ensure all required fields are provided
                    age=applicant.age,  # Assuming `age` is somehow provided or calculated
                    # Add other fields as necessary
                )
                Enrollment.objects.create(
                    parent=applicant.parent, student=student)
                email_subject = "Application Approved"
                email_body = f"Dear {applicant.parent.first_name} {applicant.parent.last_name}, your application for {applicant.first_name} {applicant.last_name} has been approved."
                self.send_email(applicant.email, email_subject, email_body)

            elif new_status == 'Rejected':
                email_subject = "Application Rejected"
                email_body = f"Dear {applicant.parent.first_name} {applicant.parent.last_name}, we regret to inform you that your application for {applicant.first_name} {applicant.last_name} has been rejected."

            elif new_status == 'Pending':
                email_subject = "Application Pending"
                email_body = f"Dear {applicant.parent.first_name} {applicant.parent.last_name}, your application for {applicant.first_name} {applicant.last_name} is currently pending review."

            # Sending email notification
            try:
                email = EmailMessage(
                    subject=email_subject,
                    body=email_body,
                    from_email='no-reply@learninggardenmontessori.ph',
                    to=[applicant.email],
                    cc=cc_list if cc_list != [''] else [],
                    bcc=bcc_list if bcc_list != [''] else []
                )
                email.send()
            except Exception as e:
                # Handle email sending errors appropriately
                return JsonResponse({'error': 'Failed to send email', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return JsonResponse({'status': 'success', 'message': f'Applicant {new_status} and notified.'}) """


""" def approve_applicant(request, applicant_id):
    applicant = get_object_or_404(Applicant, id=applicant_id)
    applicant.status = 'Approved'
    applicant.save()

    # Create a new Student instance based on the Applicant data
    student = Student.objects.create(
        first_name=applicant.first_name,
        middle_name=applicant.middle_name,
        last_name=applicant.last_name,
        # Set other relevant fields
    )

    # Associate the Student with the Parent
    parent = applicant.parent
    parent.students.add(student)

    # Generate an enrollment link using Django JWT
    enrollment_link = generate_enrollment_link(student)

    # Return the enrollment link as a JSON response
    return JsonResponse({'enrollment_link': enrollment_link})


def generate_enrollment_link(student):
    # Generate an enrollment link using the student's JWT token
    refresh = RefreshToken.for_user(student)
    enrollment_link = f"https://example.com/enrollment/{student.id}/?token={refresh.access_token}"
    return enrollment_link


def send_approval_email(applicant):
    if applicant.email:
        send_mail(
            'Application Approved',
            f'Dear {applicant.parent.name}, your application for {applicant.first_name} {applicant.last_name} has been approved.',
            'no-reply@yourdomain.com',
            [applicant.email],
            fail_silently=False,
        )
 """
