from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from phonenumber_field.modelfields import PhoneNumberField
from apps.students.models import Student
from apps.parents.models import Parent


class UserProfile(models.Model):
    USER_TYPES = (
        ('PARENT', 'Parent'),
        ('STUDENT', 'Student'),
        ('STAFF', 'Staff'),
    )

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='userprofile'
    )

    user_type = models.CharField(
        max_length=20,
        choices=USER_TYPES
    )

    # For linking to existing models
    parent = models.OneToOneField(
        'parents.Parent',
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name='user_profile'
    )

    student = models.OneToOneField(
        'students.Student',
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name='user_profile'
    )

    last_login_ip = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'User Profile'
        verbose_name_plural = 'User Profiles'

    def __str__(self):
        return f"{self.user.username} - {self.user_type}"

    def save(self, *args, **kwargs):
        # Ensure user type matches linked profile
        if self.parent and self.user_type != 'PARENT':
            self.user_type = 'PARENT'
        elif self.student and self.user_type != 'STUDENT':
            self.user_type = 'STUDENT'
        super().save(*args, **kwargs)


class ParentProfile(models.Model):
    user_profile = models.OneToOneField(
        UserProfile,
        on_delete=models.CASCADE,
        related_name='parent_profile'
    )

    parent = models.OneToOneField(
        'parents.Parent',
        on_delete=models.CASCADE,
        related_name='extended_profile'
    )

    children = models.ManyToManyField(
        'students.Student',
        related_name='parent_profiles',
        blank=True
    )

    # Add contact preferences
    preferred_contact_method = models.CharField(
        max_length=20,
        choices=[
            ('EMAIL', 'Email'),
            ('SMS', 'SMS'),
            ('PHONE', 'Phone Call')
        ],
        default='EMAIL'
    )

    alternate_phone = PhoneNumberField(
        null=True,
        blank=True,
        help_text="Alternative contact number"
    )

    notification_preferences = models.JSONField(
        default=dict,
        help_text="JSON field for notification settings"
    )

    class Meta:
        verbose_name = 'Parent Profile'
        verbose_name_plural = 'Parent Profiles'

    def __str__(self):
        return f"Parent Profile - {self.parent.first_name} {self.parent.last_name}"

    def sync_children(self):
        """Sync children based on existing Applicant relationships"""
        children = Student.objects.filter(applicant__parent=self.parent)
        self.children.set(children)
        return True

    @property
    def primary_contact(self):
        """Get primary contact from parent model"""
        return self.parent.primary_contact_value if self.parent else None


class StudentProfile(models.Model):
    user_profile = models.OneToOneField(
        UserProfile,
        on_delete=models.CASCADE,
        related_name='student_profile'
    )

    student = models.OneToOneField(
        'students.Student',
        on_delete=models.CASCADE,
        related_name='extended_profile'
    )

    parent_profile = models.ForeignKey(
        ParentProfile,
        on_delete=models.CASCADE,
        related_name='student_profiles'
    )

    class Meta:
        verbose_name = 'Student Profile'
        verbose_name_plural = 'Student Profiles'

    def __str__(self):
        return f"Student Profile - {self.student.first_name} {self.student.last_name}"

    @property
    def grade_level(self):
        """Get current grade level"""
        return self.student.grade if self.student else None

# Signals to create profiles automatically


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """Create UserProfile when User is created"""
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=Parent)
def create_parent_profile(sender, instance, created, **kwargs):
    """Create or update ParentProfile when Parent is saved"""
    if created:
        # Create user if doesn't exist
        user, user_created = User.objects.get_or_create(
            email=instance.email,
            defaults={
                'username': instance.email,
                'first_name': instance.first_name,
                'last_name': instance.last_name
            }
        )

        # Create or get UserProfile
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
