# apps/accounts/management/commands/create_superuser.py
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from apps.accounts.models import UserProfile


class Command(BaseCommand):
    help = 'Create a new superuser and ensure UserProfile is created'

    def handle(self, *args, **kwargs):
        username = 'oneadmin'
        email = 'onedirection@lgms.ph'
        password = '123456'

        # Create a new superuser
        new_superuser, created = User.objects.get_or_create(
            username=username,
            defaults={
                'email': email,
                'is_superuser': True,
                'is_staff': True,
            }
        )

        if created:
            new_superuser.set_password(password)
            new_superuser.save()
            self.stdout.write(self.style.SUCCESS(
                f'Superuser {username} created successfully'))
        else:
            self.stdout.write(self.style.SUCCESS(
                f'Superuser {username} already exists'))

        # Ensure UserProfile is created for the new superuser
        user_profile, created = UserProfile.objects.get_or_create(
            user=new_superuser,
            defaults={'user_type': 'ADMIN'}
        )

        if created:
            self.stdout.write(self.style.SUCCESS(
                f'UserProfile for {username} created successfully'))
        else:
            self.stdout.write(self.style.SUCCESS(
                f'UserProfile for {username} already exists'))
