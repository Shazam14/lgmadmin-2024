from django.core.management.base import BaseCommand
from apps.students.models import Student
from apps.parents.models import Parent
import random
import string
from datetime import date, timedelta
from faker import Faker


class Command(BaseCommand):
    help = 'Generate test students'

    def add_arguments(self, parser):
        parser.add_argument('num_students', type=int,
                            help='Number of test students to generate')

    def handle(self, *args, **options):
        num_students = options['num_students']
        faker = Faker()  # Initialize a Faker generator

        for _ in range(num_students):
            student_id = ''.join(random.choices(
                string.ascii_uppercase + string.digits, k=8))
            # Using Faker for first name
            first_name = f"Test{faker.first_name()}"
            last_name = faker.last_name()
            gender = random.choice(['Male', 'Female'])
            age = random.randint(5, 18)
            birthday = date.today() - timedelta(days=365 * age)
            email = f"{student_id.lower()}@example.com"

            student = Student(
                student_id=student_id,
                first_name=first_name,
                last_name=last_name,
                gender=gender,
                age=age,
                birthday=birthday,
                email=email,
                student_status='Enrolled',
                active_program='Default Program',
                grade=random.choice(['A', 'B', 'C', 'D', 'E', 'F']),
                section=random.choice(
                    ['Loyalty', 'Friendship', 'Hope', 'Faith', 'Unity']),
                tuition_status=random.choice(['U', 'FP']),
                account_status=random.choice(['A', 'I']),
            )
            student.save()
            self.stdout.write(self.style.SUCCESS(
                f'Successfully generated {num_students} test students'))
