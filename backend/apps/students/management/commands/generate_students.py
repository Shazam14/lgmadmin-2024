from django.core.management.base import BaseCommand
from apps.students.models import Student
import random
import string
from datetime import date, timedelta


class Command(BaseCommand):
    help = 'Generate test students'

    def add_arguments(self, parser):
        parser.add_argument('num_students', type=int,
                            help='Number of test students to generate')

    def handle(self, *args, **options):
        num_students = options['num_students']
        for _ in range(num_students):
            # Generate random student data
            student_id = ''.join(random.choices(
                string.ascii_uppercase + string.digits, k=8))
            name = f"Test Student {student_id}"
            birthday = date.today() - timedelta(days=random.randint(6570, 29200)
                                                )  # Between 18 and 80 years ago
            email = f"{student_id}@example.com"
            tuition_status = random.choice(('U', 'FP'))
            account_status = random.choice(('A', 'I'))

            # Create and save the student
            student = Student(
                student_id=student_id,
                name=name,
                birthday=birthday,
                email=email,
                tuition_status=tuition_status,
                account_status=account_status
            )
            student.save()
            self.stdout.write(self.style.SUCCESS(
                f'Successfully generated {num_students} test students'))
