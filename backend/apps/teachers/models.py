# teachers/models.py
from django.db import models


class Teacher(models.Model):
    ACTIVE = 'Active'
    RESIGNED = 'Resigned'
    ACCOUNT_STATUS_CHOICES = [
        (ACTIVE, 'Active'),
        (RESIGNED, 'Resigned'),
    ]

    teacher_id = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    assigned_course = models.CharField(max_length=100)
    account_status = models.CharField(
        max_length=20, choices=ACCOUNT_STATUS_CHOICES)

    def __str__(self):
        return self.name
