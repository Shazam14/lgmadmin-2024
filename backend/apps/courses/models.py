# courses/models.py
from django.db import models
from apps.teachers.models import Teacher


class Course(models.Model):
    ASSIGNED = 'Assigned'
    VACANT = 'Vacant'
    COURSE_STATUS_CHOICES = [
        (ASSIGNED, 'Assigned'),
        (VACANT, 'Vacant'),
    ]

    course_id = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    teacher_assigned = models.ForeignKey(
        Teacher, on_delete=models.SET_NULL, null=True, blank=True)
    phone_number = models.CharField(max_length=20)
    details = models.TextField()
    course_status = models.CharField(
        max_length=20, choices=COURSE_STATUS_CHOICES)

    def __str__(self):
        return self.name
