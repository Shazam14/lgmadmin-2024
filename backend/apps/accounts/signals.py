# apps/accounts/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import UserProfile, ParentProfile, StudentProfile
from apps.parents.models import Parent
from apps.students.models import Student


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """Only create UserProfile if it doesn't already exist"""
    if created:
        # Check if UserProfile already exists
        if not hasattr(instance, 'userprofile'):
            user_type = 'ADMIN' if (
                instance.is_superuser or instance.is_staff) else 'STAFF'
            UserProfile.objects.create(user=instance, user_type=user_type)


@receiver(post_save, sender=Parent)
def create_parent_profile(sender, instance, created, **kwargs):
    """Create or update parent-related profiles"""
    if created:
        # Get or create user
        user, user_created = User.objects.get_or_create(
            email=instance.email,
            defaults={
                'username': instance.email,
                'first_name': instance.first_name,
                'last_name': instance.last_name
            }
        )

        # Get or create UserProfile
        user_profile, profile_created = UserProfile.objects.get_or_create(
            user=user,
            defaults={'user_type': 'PARENT'}
        )

        # Update parent reference if needed
        if user_profile.parent != instance:
            user_profile.parent = instance
            user_profile.save()

        # Create ParentProfile if it doesn't exist
        ParentProfile.objects.get_or_create(
            user_profile=user_profile,
            parent=instance
        )


@receiver(post_save, sender=Student)
def create_student_profile(sender, instance, created, **kwargs):
    """Create or update student-related profiles"""
    if created:
        # Get or create user
        user, user_created = User.objects.get_or_create(
            email=instance.email,
            defaults={
                'username': instance.email,
                'first_name': instance.first_name,
                'last_name': instance.last_name
            }
        )

        # Get or create UserProfile
        user_profile, profile_created = UserProfile.objects.get_or_create(
            user=user,
            defaults={'user_type': 'STUDENT'}
        )

        # Update student reference if needed
        if user_profile.student != instance:
            user_profile.student = instance
            user_profile.save()

        try:
            # Get parent profile
            parent_profile = ParentProfile.objects.get(
                parent=instance.applicant.parent
            )

            # Create StudentProfile if it doesn't exist
            StudentProfile.objects.get_or_create(
                user_profile=user_profile,
                student=instance,
                parent_profile=parent_profile
            )

            # Sync parent's children
            parent_profile.sync_children()

        except ParentProfile.DoesNotExist:
            # Log error if parent profile not found
            print(f"Parent profile not found for student {instance.id}")
