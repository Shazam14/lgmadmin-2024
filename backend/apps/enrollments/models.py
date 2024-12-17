from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from apps.applicants.models import Applicant
from apps.students.models import Student
from apps.grades.models import Program, Subject, GradeLevel, Grade


class Enrollment(models.Model):
    student = models.ForeignKey(
        "students.Student", on_delete=models.CASCADE, default=1)
    grade_level = models.ForeignKey(
        "grades.GradeLevel", on_delete=models.CASCADE, null=True, blank=True)
    enrollment_date = models.DateField(auto_now_add=True)
    academic_year = models.IntegerField(validators=[
        MinValueValidator(1900),
        MaxValueValidator(2099)
    ])
    ACADEMIC_PERIOD_CHOICES = [
        ('Q1', '1st Quarter'),
        ('Q2', '2nd Quarter'),
        ('Q3', '3rd Quarter'),
        ('Q4', '4th Quarter'),
        ('S1', '1st Semester'),
        ('S2', '2nd Semester')
    ]
    academic_period = models.CharField(
        max_length=3, choices=ACADEMIC_PERIOD_CHOICES)
    subjects = models.ManyToManyField("grades.Subject",)
    ENROLLMENT_STATUS_CHOICES = [
        ('ENROLLED', 'Enrolled'),
        ('WITHDRAWN', 'Withdrawn'),
        ('GRADUATED', 'Graduated'),
    ]
    enrollment_status = models.CharField(
        max_length=20, choices=ENROLLMENT_STATUS_CHOICES)
    previous_school = models.CharField(max_length=200)
    previous_school_address = models.CharField(max_length=200)
    previous_school_phone = models.CharField(max_length=20)
    special_needs = models.TextField(blank=True)
    allergies = models.TextField(blank=True)
    medications = models.TextField(blank=True)

    def __str__(self):
        return f"Enrollment for {self.student.first_name} {self.student.last_name}"
