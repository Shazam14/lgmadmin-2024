from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils import timezone
from django.conf import settings
from django.db import transaction
from django.db.models import Q
from django.db.models.signals import post_save
from apps.parents.models import Parent
from apps.applicants.models import Applicant
from apps.students.models import Student
from apps.grades.models import Program
from apps.accounts.models import UserProfile, ParentProfile, StudentProfile
# Import your signal handlers
from apps.accounts.signals import create_user_profile, create_parent_profile
from apps.portal.models import PortalNotification, PortalActivity
import random
import string
from datetime import datetime, timedelta
from contextlib import contextmanager


class Command(BaseCommand):
    help = 'Generate test data following the complete application to portal flow'

    def add_arguments(self, parser):
        parser.add_argument('count', type=int,
                            help='Number of family sets to create')

    @contextmanager
    def disable_signals(self):
        """Temporarily disable the post_save signals"""
        # Store the existing receivers
        saved_receivers = post_save.receivers
        post_save.receivers = []

        try:
            yield
        finally:
            # Restore the receivers
            post_save.receivers = saved_receivers

    def cleanup_test_data(self):
        """Clean up all test-related data thoroughly while protecting admin accounts"""
        self.stdout.write(self.style.WARNING(
            'Starting complete cleanup of test data...'))

        try:
            with transaction.atomic():
                # Print existing counts
                self.stdout.write('Current record counts before cleanup:')
                total_users = User.objects.count()
                admin_users = User.objects.filter(is_superuser=True).count()
                test_users = User.objects.filter(
                    is_superuser=False, email__endswith='@test.com').count()
                self.stdout.write(
                    f'Total Users: {total_users} (including {admin_users} admin users)')
                self.stdout.write(f'Test Users to be deleted: {test_users}')
                self.stdout.write(
                    f'UserProfiles: {UserProfile.objects.count()}')
                self.stdout.write(
                    f'ParentProfiles: {ParentProfile.objects.count()}')
                self.stdout.write(
                    f'StudentProfiles: {StudentProfile.objects.count()}')

                # Delete in proper order to avoid constraint violations
                self.stdout.write(
                    'Deleting test portal activities and notifications...')
                PortalNotification.objects.filter(
                    user__email__endswith='@test.com'
                ).delete()
                PortalActivity.objects.filter(
                    user__email__endswith='@test.com'
                ).delete()

                self.stdout.write('Deleting test student profiles...')
                StudentProfile.objects.filter(
                    Q(student__email__endswith='@test.com') |
                    Q(parent_profile__parent__email__endswith='@test.com')
                ).delete()

                self.stdout.write('Deleting test parent profiles...')
                ParentProfile.objects.filter(
                    parent__email__endswith='@test.com'
                ).delete()

                self.stdout.write('Deleting test user profiles...')
                UserProfile.objects.filter(
                    user__email__endswith='@test.com'
                ).delete()

                self.stdout.write('Deleting test users...')
                User.objects.filter(
                    is_superuser=False,
                    email__endswith='@test.com'
                ).delete()

                self.stdout.write('Deleting test students...')
                Student.objects.filter(
                    email__endswith='@test.com'
                ).delete()

                self.stdout.write('Deleting test applicants...')
                Applicant.objects.filter(
                    email__endswith='@test.com'
                ).delete()

                self.stdout.write('Deleting test parents...')
                Parent.objects.filter(
                    email__endswith='@test.com'
                ).delete()

                # Print final counts
                self.stdout.write('\nRecord counts after cleanup:')
                remaining_users = User.objects.count()
                remaining_admin = User.objects.filter(
                    is_superuser=True).count()
                self.stdout.write(
                    f'Total Users: {remaining_users} (including {remaining_admin} admin users)')
                self.stdout.write(
                    f'UserProfiles: {UserProfile.objects.count()}')
                self.stdout.write(
                    f'ParentProfiles: {ParentProfile.objects.count()}')
                self.stdout.write(
                    f'StudentProfiles: {StudentProfile.objects.count()}')

                # Verify admin accounts are intact
                admin_emails = User.objects.filter(
                    is_superuser=True).values_list('email', flat=True)
                self.stdout.write('\nPreserved admin accounts:')
                for email in admin_emails:
                    self.stdout.write(f'- {email}')

                self.stdout.write(self.style.SUCCESS(
                    '\nCleanup completed successfully'))

        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error during cleanup: {str(e)}')
            )
            raise e

    def handle(self, *args, **kwargs):
        count = kwargs['count']
        self.stdout.write(self.style.NOTICE(
            'Starting test data generation...'))

        # Always run cleanup first
        self.cleanup_test_data()

        self.stdout.write("Performing additional cleanup...")
        UserProfile.objects.all().exclude(
            user__is_superuser=True
        ).delete()

      # Verify programs exist
        programs = Program.objects.all()
        if not programs.exists():
            self.stdout.write(
                self.style.ERROR(
                    'No programs found. Please create programs first.')
            )
            return

        first_parent_code = None
        first_student_code = None

        try:
            with self.disable_signals():
                with transaction.atomic():
                    for i in range(count):
                        self.stdout.write(
                            f'\nCreating family {i + 1} of {count}...')

                    # Clean up any existing user/profile before creating new ones
                        parent_email = f"parent{i}@test.com"
                        User.objects.filter(email=parent_email).delete()
                        UserProfile.objects.filter(
                            user__email=parent_email).delete()

                        # Create parent
                        parent = Parent.objects.create(
                            first_name=f"TestParent{i}",
                            last_name=f"Family{i}",
                            email=f"parent{i}@test.com",
                            phone_number="+639171234567",
                            street_address=f"123 Test St. #{i}",
                            city="Paranaque City",
                            state_province="Metro Manila",
                            account_status='Active',
                            relationship='Mother',
                            primary_contact_value="+639171234567",
                            contact_priority='Primary'
                        )

                        # Debug output
                        self.stdout.write(
                            f'Created parent with ID: {parent.id}')

                        # Generate parent access code
                        parent_code = ''.join(random.choices(
                            string.ascii_letters + string.digits, k=8))
                        parent.access_code = parent_code
                        parent.portal_access_enabled = True
                        parent.save()

                        if i == 0:
                            first_parent_code = parent_code

                        # Create parent user
                        parent_user = User.objects.create_user(
                            username=f"parent{i}@test.com",
                            email=f"parent{i}@test.com",
                            password="testpass123"
                        )

                        # Create parent user profile
                        parent_user_profile = UserProfile.objects.create(
                            user=parent_user,
                            user_type='PARENT',
                            parent=parent
                        )

                        parent_profile = ParentProfile.objects.create(
                            user_profile=parent_user_profile,
                            parent=parent,
                            preferred_contact_method='EMAIL',
                            notification_preferences={
                                'email_notifications': True,
                                'sms_notifications': False
                            }
                        )

                        # Create students for this parent
                        for j in range(2):
                            # Create applicant first
                            applicant = Applicant.objects.create(
                                first_name=f"TestStudent{i}{j}",
                                last_name=f"Family{i}",
                                parent=parent,
                                gender='Female' if j % 2 == 0 else 'Male',
                                age=random.randint(5, 15),
                                birthday=timezone.now() - timedelta(days=random.randint(2000, 4000)),
                                program_option=random.choice(programs),
                                email=f"student{i}{j}@test.com",
                                status='Approved'
                            )

                            # Create student
                            student = Student.objects.create(
                                applicant=applicant,
                                program=applicant.program_option,
                                first_name=applicant.first_name,
                                last_name=applicant.last_name,
                                gender=applicant.gender,
                                age=applicant.age,
                                birthday=applicant.birthday,
                                email=applicant.email,
                                student_id=f"2024{i}{j}0001",
                                student_status="Active",
                                grade=f"Grade {random.randint(1, 10)}",
                                section="A",
                                tuition_status="FP",
                                account_status="A"
                            )

                            # Generate student access code
                            student_code = ''.join(random.choices(
                                string.ascii_letters + string.digits, k=8))
                            student.access_code = student_code
                            student.portal_access_enabled = True
                            student.save()

                            if i == 0 and j == 0:
                                first_student_code = student_code

                            # Create student user
                            student_user = User.objects.create_user(
                                username=f"student{i}{j}@test.com",
                                email=f"student{i}{j}@test.com",
                                password="testpass123"
                            )

                            # Create student profiles
                            student_user_profile = UserProfile.objects.create(
                                user=student_user,
                                user_type='STUDENT',
                                student=student
                            )

                            StudentProfile.objects.create(
                                user_profile=student_user_profile,
                                student=student,
                                parent_profile=parent_profile
                            )

                        # Create parent notifications after all setup is complete
                        PortalNotification.objects.create(
                            user=parent_user,
                            title="Welcome to LGMS Portal",
                            message="Welcome to the Learning Garden Montessori School portal system.",
                            category="welcome"
                        )

                        PortalActivity.objects.create(
                            user=parent_user,
                            activity_type="LOGIN",
                            description="Initial portal access"
                        )

                        parent_profile.sync_children()

                    self.stdout.write(self.style.SUCCESS(
                        f'\nSuccessfully created {count} families with {count * 2} students'
                    ))

                    self.stdout.write('\nTest Credentials:')
                    self.stdout.write('Parent Portal Access:')
                    self.stdout.write(f'Email: parent0@test.com')
                    self.stdout.write(f'Password: testpass123')
                    self.stdout.write(f'Access Code: {first_parent_code}')
                    self.stdout.write('\nStudent Portal Access:')
                    self.stdout.write(f'Email: student00@test.com')
                    self.stdout.write(f'Password: testpass123')
                    self.stdout.write(f'Access Code: {first_student_code}')

        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'\nError creating test data: {str(e)}')
            )
            self.stdout.write('Rolling back all changes...')
            raise e
