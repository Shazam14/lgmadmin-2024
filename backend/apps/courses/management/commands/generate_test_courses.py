# generate_courses.py
from django.core.management.base import BaseCommand
from apps.teachers.models import Teacher
from apps.courses.models import Course
from faker import Faker
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()


class Command(BaseCommand):
    help = 'Generate test courses'

    def add_arguments(self, parser):
        parser.add_argument('num_courses', type=int,
                            help='Number of test courses to generate')

    def handle(self, *args, **options):
        num_courses = options['num_courses']
        self.generate_test_courses(num_courses)
        self.stdout.write(self.style.SUCCESS(
            f"{num_courses} test courses generated successfully."))

    def generate_test_courses(self, num_courses):
        fake = Faker()
        teachers = Teacher.objects.all()

        if not teachers:
            self.stdout.write(self.style.WARNING(
                "No teachers found. Please generate test teachers first."))
            return

        for _ in range(num_courses):
            # Randomly select a teacher
            teacher = teachers.order_by('?').first()
            course = Course(
                course_id=fake.unique.random_int(min=1000, max=9999),
                name=f"{fake.job()} TEST",
                teacher_assigned=teacher,
                phone_number=fake.phone_number()[:20],
                details=fake.paragraph(nb_sentences=3),
                course_status=fake.random_element(
                    elements=('Assigned', 'Vacant'))
            )
            course.save()
