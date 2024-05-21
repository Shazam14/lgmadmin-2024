from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from your_app.models import Applicant

class Command(BaseCommand):
    help = 'Assigns custom permissions to the admin group'

    def handle(self, *args, **options):
        # Get the admin group
        admin_group, created = Group.objects.get_or_create(name='Admin')

        # Get the content type for the Applicant model
        applicant_content_type = ContentType.objects.get_for_model(Applicant)

        # Get the custom permissions for the Applicant model
        approve_permission, _ = Permission.objects.get_or_create(
            codename='can_approve_applicant',
            name='Can approve applicant',
            content_type=applicant_content_type,
        )
        reject_permission, _ = Permission.objects.get_or_create(
            codename='can_reject_applicant',
            name='Can reject applicant',
            content_type=applicant_content_type,
        )

        # Assign the custom permissions to the admin group
        admin_group.permissions.add(approve_permission, reject_permission)

        self.stdout.write(self.style.SUCCESS('Custom permissions assigned to the admin group.'))