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


class ApplicantViewSet(viewsets.ModelViewSet):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer


class ApplicantApprovalView(APIView):
    def post(self, request, applicant_id):
        applicant = Applicant.objects.get(id=applicant_id)
        if applicant.status == 'Approved':
            student = Student.objects.create(applicant=applicant)
            enrollment = Enrollment.objects.create(
                parent=applicant.parent, student=student)
            # Additional logic for sending the enrollment link form
            ...
        # Rest of the view logic
        ...


def approve_applicant(request, applicant_id):
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
