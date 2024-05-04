from django.db import models
from apps.students.models import Student


class Parent(models.Model):
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=50)
    state_province = models.CharField(max_length=50)
    students = models.ManyToManyField(Student, related_name='parents')
    parent_id = models.CharField(max_length=20)
    account_status = models.CharField(max_length=20, default='Active')
    relationship = models.CharField(max_length=50)
    primary_contact = models.CharField(max_length=15)
    secondary_contact = models.CharField(max_length=15, blank=True)
    contact_priority = models.CharField(
        max_length=20, choices=[('Primary', 'Primary'), ('Secondary', 'Secondary')])

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.parent_id})"
