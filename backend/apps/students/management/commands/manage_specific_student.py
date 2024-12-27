from django.core.management.base import BaseCommand
from django.utils import timezone
from django.db import transaction
from apps.students.models import Student, AttendanceRecord
from apps.grades.models import Grade, Program, Subject, GradeLevel
from apps.enrollments.models import Enrollment
from datetime import datetime, timedelta
import random


class Command(BaseCommand):
    help = 'Manage specific student data for testing'

    def handle(self, *args, **kwargs):
        try:
            with transaction.atomic():
                # Ensure the Program exists
                program, created = Program.objects.get_or_create(
                    name="Elementary School",
                    defaults={
                        "description": "Elementary School Program",
                        "age_range": "6-12"
                    }
                )

                # Ensure the GradeLevel exists
                grade_level, created = GradeLevel.objects.get_or_create(
                    program=program,
                    name="Grade 3"
                )

                # Get or create the specific student
                student, created = Student.objects.get_or_create(
                    email="student00@test.com",
                    defaults={
                        "first_name": "TestStudent00",
                        "last_name": "Family0",
                        "middle_name": "",
                        "gender": "Female",
                        "age": 8,
                        "birthday": "2014-10-20",
                        "grade": "Grade 3",  # Ensure this value fits within the field's max_length
                        "section": "A",
                        "student_id": "2024000001",
                        "student_status": "Active",
                        "program": program
                    }
                )

                if created:
                    self.stdout.write(
                        self.style.SUCCESS('Created new student'))
                else:
                    self.stdout.write(self.style.SUCCESS(
                        'Found existing student'))

                # Add grades
                self.create_grades(student)

                # Add attendance
                self.create_attendance(student)

                # Add enrollment
                self.create_enrollment(student, grade_level)

                self.stdout.write(self.style.SUCCESS(
                    'Successfully added all data'))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error: {str(e)}'))

    def create_grades(self, student):
        """Create specific grades for the student"""
        subjects = [
            ("Mathematics", 92, 94, 90),
            ("Science", 88, 89, 91),
            ("English", 90, 92, 89),
            ("Filipino", 87, 88, 90),
            ("MAPEH", 91, 93, 92)
        ]

        for subject_name, q1, q2, q3 in subjects:
            subject, created = Subject.objects.get_or_create(
                name=subject_name
            )
            Grade.objects.get_or_create(
                student=student,
                subject=subject,
                defaults={
                    "written_work": random.randint(85, 95),
                    "performance_task": random.randint(85, 95),
                    "quarterly_exam": random.randint(85, 95),
                    "quarterly_grade": q1,
                    "final_grade": 0,  # Set a default value for final_grade
                    "evaluation_code": "P",
                    "remedial_passed": True
                }
            )

    def create_attendance(self, student):
        """Create attendance records for the student"""
        start_date = timezone.now() - timedelta(days=90)

        current = start_date
        while current <= timezone.now():
            if current.weekday() < 5:  # Monday to Friday
                present = random.random() > 0.1  # 90% attendance rate
                AttendanceRecord.objects.get_or_create(
                    student=student,
                    date=current,
                    defaults={
                        "status": 'Present' if present else 'Absent',
                        "remarks": "" if present else random.choice(
                            ['Sick', 'Family Emergency', 'Other']
                        )
                    }
                )
            current += timedelta(days=1)

    def create_enrollment(self, student, grade_level):
        """Create enrollment record for the student"""
        enrollment, created = Enrollment.objects.get_or_create(
            student=student,
            academic_year=2024,
            defaults={
                "enrollment_date": timezone.now(),
                "academic_period": "S1",  # Ensure this value fits within the field's max_length
                "enrollment_status": "ENROLLED",
                "grade_level": grade_level,  # Assign the GradeLevel instance
                "previous_school": "Test Elementary School",
                "previous_school_address": "123 Previous School St.",
                "previous_school_phone": "+639171234567",
                "special_needs": "None",
                "allergies": "None",
                "medications": "None"
            }
        )
