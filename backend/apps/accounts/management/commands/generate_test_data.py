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

    def create_test_enrollment(self, student, academic_year="2024"):
        """Create a test enrollment for a student"""
        return Enrollment.objects.create(
            student=student,
            academic_year=academic_year,
            enrollment_date=timezone.now(),
            academic_period="Fall 2024",
            enrollment_status="Active",
            grade_level=student.program.gradelevel,
            previous_school="Previous Test School",
            previous_school_address="123 Test Street",
            previous_school_phone="123-456-7890",
            special_needs="None",
            allergies="None",
            medications="None",
        )

    def create_test_grades(self, student):
        """Generate realistic test grades for a student"""
        subjects = ["Mathematics", "Science", "English", "Filipino", "MAPEH"]
        grades = []

        for subject in subjects:
            # Generate realistic grade components
            written_work = random.randint(85, 95)
            performance_task = random.randint(85, 95)
            quarterly_exam = random.randint(85, 95)

            # Calculate quarterly grade using proper weighting
            quarterly_grade = (written_work * 0.3) + \
                (performance_task * 0.5) + (quarterly_exam * 0.2)

            grades.append(Grade.objects.create(
                student=student,
                subject=subject,
                written_work=written_work,
                performance_task=performance_task,
                quarterly_exam=quarterly_exam,
                quarterly_grade=round(quarterly_grade, 2),
                evaluation_code="P" if quarterly_grade >= 75 else "F"
            ))
        return grades

    def create_test_medical_records(self, student):
        """Create test medical records for a student"""
        return MedicalRecord.objects.create(
            student=student,
            blood_type=random.choice(
                ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
            height=random.randint(100, 170),
            weight=random.randint(20, 70),
            vision_left="20/20",
            vision_right="20/20",
            last_checkup=timezone.now() - timedelta(days=random.randint(0, 180))
        )

    def create_test_attendance(self, student, start_date=None):
        """Generate realistic attendance records"""
        if not start_date:
            start_date = timezone.now() - timedelta(days=90)

        school_days = []
        current = start_date
        while current <= timezone.now():
            if current.weekday() < 5:  # Monday to Friday
                present = random.random() > 0.1  # 90% attendance rate
                AttendanceRecord.objects.create(
                    student=student,
                    date=current,
                    status='Present' if present else 'Absent',
                    remarks="" if present else random.choice(
                        ['Sick', 'Family Emergency', 'Other'])
                )
            current += timedelta(days=1)

    def validate_test_data(self, student_id):
        """Validate test data for a student"""
        try:
            student = Student.objects.get(student_id=student_id)
            validations = {
                'Enrollment': bool(student.enrollment_set.all()),
                'Grades': bool(student.grade_set.exists()),
                'Medical Records': bool(student.medicalrecord_set.exists()),
                'Attendance': bool(student.attendancerecord_set.exists()),
                'Parent Profiles': bool(student.parent_profiles.exists()),
            }
            missing = [k for k, v in validations.items() if not v]
            return not bool(missing), missing
        except Student.DoesNotExist:
            return False, ['Student not found']

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

                            enrollment = self.create_test_enrollment(student)
                            grades = self.create_test_grades(student)
                            medical = self.create_test_medical_records(
                                student
                            )
                            attendance = self.create_test_attendance(
                                student
                            )
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
