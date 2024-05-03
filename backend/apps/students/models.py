from django.db import models

# Create your models here.


class Student(models.Model):
    TUITION_STATUS_CHOICES = [
        ('U', 'Unsettled'),
        ('FP', 'Fully Paid'),
    ]

    ACCOUNT_STATUS_CHOICES = [
        ('A', 'Active'),
        ('I', 'Inactive')
    ]

    first_name = models.CharField(max_length=50, default='First Name')
    middle_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, default='Last Name')
    gender = models.CharField(max_length=10, default='Female')
    age = models.PositiveIntegerField(default=7)
    birthday = models.DateField()
    email = models.EmailField()

    # Assuming student ID is a unique identifier like '2024123456'
    student_id = models.CharField(max_length=20, unique=True)
    student_status = models.CharField(
        max_length=20, default='Enrolled')  # Default as 'Enrolled'
    active_program = models.CharField(max_length=50, default='Default Program')
    grade = models.CharField(max_length=20, default='A')
    section = models.CharField(max_length=20, default='Hope')
    tuition_notes = models.TextField(blank=True)  # this is remarks originally
    tuition_status = models.CharField(
        max_length=20, choices=TUITION_STATUS_CHOICES)
    account_status = models.CharField(
        max_length=20, choices=ACCOUNT_STATUS_CHOICES)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.student_id})"
