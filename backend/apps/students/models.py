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

    student_id = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    birthday = models.DateField()
    email = models.EmailField()
    tuition_notes = models.TextField(blank=True)
    tuition_status = models.CharField(
        max_length=20, choices=TUITION_STATUS_CHOICES)
    account_status = models.CharField(
        max_length=20, choices=ACCOUNT_STATUS_CHOICES)

    def __str__(self):
        return self.name
