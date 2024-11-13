# apps/accounts/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import UserProfile, ParentProfile, StudentProfile
from apps.parents.models import Parent
from apps.students.models import Student


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=Parent)
def create_parent_profile(sender, instance, created, **kwargs):
    if created:
        # Create user if doesn't exist
        user, created = User.objects.get_or_create(
            email=instance.email,
            defaults={
                'username': instance.email,
                'first_name': instance.first_name,
                'last_name': instance.last_name
            }
        )

        # Create or update UserProfile
        user_profile, _ = UserProfile.objects.get_or_create(
            user=user,
            defaults={'user_type': 'PARENT'}
        )
        user_profile.parent = instance
        user_profile.save()

        # Create ParentProfile
        ParentProfile.objects.get_or_create(
            user_profile=user_profile,
            parent=instance
        )


@receiver(post_save, sender=Student)
def create_student_profile(sender, instance, created, **kwargs):
    if created:
        # Create user if doesn't exist
        user, created = User.objects.get_or_create(
            email=instance.email,
            defaults={
                'username': instance.email,
                'first_name': instance.first_name,
                'last_name': instance.last_name
            }
        )

        # Create or update UserProfile
        user_profile, _ = UserProfile.objects.get_or_create(
            user=user,
            defaults={'user_type': 'STUDENT'}
        )
        user_profile.student = instance
        user_profile.save()

        # Get parent profile
        parent_profile = ParentProfile.objects.get(
            parent=instance.applicant.parent
        )

        # Create StudentProfile
        StudentProfile.objects.get_or_create(
            user_profile=user_profile,
            student=instance,
            parent_profile=parent_profile
        )

        # Sync parent's children
        parent_profile.sync_children()
