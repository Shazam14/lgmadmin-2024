# models.py
from django.db import models


class Applicant(models.Model):
    ACCEPTED = 'Accepted'
    REJECTED = 'Rejected'
    STATUS_CHOICES = [
        (ACCEPTED, 'Accepted'),
        (REJECTED, 'Rejected'),
    ]

    applicant_id = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    course_of_interest = models.CharField(max_length=100)
    application_status = models.CharField(
        max_length=20, choices=STATUS_CHOICES)
    actions = models.CharField(max_length=100)

    def __str__(self):
        return self.name
