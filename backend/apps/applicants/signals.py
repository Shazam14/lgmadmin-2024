# In applicants/signals.py
""" 
from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.applicants.models import Applicant
from apps.students.models import Student
from apps.applicants.utils.utils import get_program_based_on_applicant


@receiver(post_save, sender=Applicant)
def create_student_for_approved_applicant(sender, instance, created, **kwargs):
    if instance.status == 'Approved' and not Student.objects.filter(applicant=instance).exists():
        # Assume we also set up some fields from the applicant
        Student.objects.create(
            applicant=instance,
            first_name=instance.first_name,
            last_name=instance.last_name,
            program=get_program_based_on_applicant(instance),
            # Add more fields as necessary
        )
 """
