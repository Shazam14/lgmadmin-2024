# generate_teachers.py
from django.core.management.base import BaseCommand

from apps.teachers.models import Teacher
from faker import Faker
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()


class Command(BaseCommand):
    help = 'Generate Test Teachers'

    def add_arguments(self, parser):
        parser.add_argument('num_teachers', type=int,
                            help='Number of test teachers to generate')

    def handle(self, *args, **options):
        fake = Faker()
        num_teachers = options['num_teachers']
        for _ in range(num_teachers):
            teacher = Teacher(
                teacher_id=fake.unique.random_int(min=1000, max=9999),
                name=f"{fake.first_name()} {fake.last_name()} TEST",
                email=fake.email(),
                phone_number=fake.phone_number()[:20],
                assigned_course=fake.job()[:100],
                account_status=fake.random_element(
                    elements=('Active', 'Resigned'))
            )
            teacher.save()
        self.stdout.write(self.style.SUCCESS(
            f'Successfully generated {num_teachers} test teachers'))
