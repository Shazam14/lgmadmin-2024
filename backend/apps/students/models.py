from django.db import models
from apps.applicants.models import Applicant
from apps.enrollments.models import Enrollment


class Student(models.Model):
    TUITION_STATUS_CHOICES = [
        ('U', 'Unsettled'),
        ('FP', 'Fully Paid'),
    ]
    ACCOUNT_STATUS_CHOICES = [
        ('A', 'Active'),
        ('I', 'Inactive')
    ]

    applicant = models.OneToOneField(
        'applicants.Applicant', on_delete=models.CASCADE)
    enrollment = models.ForeignKey(
        'enrollments.Enrollment', on_delete=models.CASCADE, related_name='students')
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50)
    gender = models.CharField(max_length=10)
    age = models.PositiveIntegerField()
    birthday = models.DateField()
    email = models.EmailField()
    student_id = models.CharField(max_length=20, unique=True)
    student_status = models.CharField(max_length=20)
    active_program = models.CharField(max_length=50)
    grade = models.CharField(max_length=20)
    section = models.CharField(max_length=20)
    tuition_notes = models.TextField(blank=True)
    tuition_status = models.CharField(
        max_length=20, choices=TUITION_STATUS_CHOICES)
    account_status = models.CharField(
        max_length=20, choices=ACCOUNT_STATUS_CHOICES)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.student_id})"
