# apps/accounts/management/commands/create_missing_profiles.py
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from apps.accounts.models import UserProfile


class Command(BaseCommand):
    help = 'Create missing UserProfile objects for existing users'

    def handle(self, *args, **kwargs):
        for user in User.objects.all():
            if not hasattr(user, 'userprofile'):
                # Assuming default user_type
                UserProfile.objects.create(user=user, user_type='STAFF')
                self.stdout.write(self.style.SUCCESS(
                    f'Successfully created UserProfile for user {user.username}'))
