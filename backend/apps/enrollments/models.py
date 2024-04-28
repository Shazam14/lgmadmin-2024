from django.db import models
from apps.applicants.models import Applicant


class Enrollment(models.Model):
    applicant = models.OneToOneField(Applicant, on_delete=models.CASCADE)
    enrollment_date = models.DateField(auto_now_add=True)
    student_id = models.CharField(max_length=20, unique=True)
    program = models.CharField(max_length=100)
    academic_year = models.CharField(max_length=20)
    start_date = models.DateField()
    end_date = models.DateField()

    SEMESTER_CHOICES = [
        ('FALL', 'Fall'),
        ('SPRING', 'Spring'),
        ('SUMMER', 'Summer'),
    ]
    semester = models.CharField(max_length=20, choices=SEMESTER_CHOICES)

    ENROLLMENT_STATUS_CHOICES = [
        ('ENROLLED', 'Enrolled'),
        ('WITHDRAWN', 'Withdrawn'),
        ('GRADUATED', 'Graduated'),
    ]
    enrollment_status = models.CharField(
        max_length=20, choices=ENROLLMENT_STATUS_CHOICES)

    # Student Information
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=20)
    student_email = models.EmailField()
    student_phone = models.CharField(max_length=20)

    # Family Information
    parent_guardian_name = models.CharField(max_length=100)
    parent_guardian_email = models.EmailField()
    parent_guardian_phone = models.CharField(max_length=20)
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)

    # Academic Information
    previous_school = models.CharField(max_length=200)
    previous_school_address = models.CharField(max_length=200)
    previous_school_phone = models.CharField(max_length=20)
    grade_level = models.CharField(max_length=20)

    # Additional Information
    special_needs = models.TextField(blank=True)
    allergies = models.TextField(blank=True)
    medications = models.TextField(blank=True)

    def __str__(self):
        return f"Enrollment for {self.applicant.name}"
