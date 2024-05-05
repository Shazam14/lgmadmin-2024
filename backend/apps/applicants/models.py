from django.db import models
from django.utils import timezone
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from apps.parents.models import Parent

class Applicant(models.Model):
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=[
        ('Male', 'Male'),
        ('Female', 'Female')
    ])
    age = models.PositiveIntegerField()
    birthday = models.DateField()
    program_option = models.CharField(max_length=20, choices=[
        ('CASA', 'CASA'),
        ('SPED', 'SPED'),
        ('Highschool', 'Highschool'),
        ('GradeSchool', 'GradeSchool'),
        ('Homestudy', 'Homestudy')
    ])
    email_same_as_parent = models.BooleanField(default=False)
    email = models.EmailField(blank=True)
    phone_number_same_as_parent = models.BooleanField(default=False)
    phone_number = models.CharField(max_length=20, blank=True)
    address_same_as_parent = models.BooleanField(default=False)
    address_house_no = models.CharField(max_length=10, blank=True)
    address_street = models.CharField(max_length=200, blank=True)
    address_barangay = models.CharField(max_length=100, blank=True)
    address_city = models.CharField(max_length=100, blank=True)
    address_state_province = models.CharField(max_length=100, blank=True)
    address_postal_code = models.CharField(max_length=20, blank=True)
    parent = models.ForeignKey(Parent, on_delete=models.CASCADE)
    applied_date = models.DateField(default=timezone.now)
    status = models.CharField(max_length=20, choices=[
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected')
    ], default='Pending')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        permissions = [
            ('can_approve_applicant', 'Can approve applicant'),
            ('can_reject_applicant', 'Can reject applicant'),
        ]