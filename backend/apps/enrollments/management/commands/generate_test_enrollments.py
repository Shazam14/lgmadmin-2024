# generate_enrollments.py
from apps.applicants.models import Applicant
from apps.enrollments.models import Enrollment
from faker import Faker
import os
import django
import random
from datetime import date, timedelta

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()


def generate_test_enrollments(num_enrollments):
    fake = Faker()
    for _ in range(num_enrollments):
        applicant = Applicant.objects.order_by(
            '?').first()  # Randomly select an applicant
        start_date = fake.date_between(start_date='-1y', end_date='today')
        end_date = start_date + timedelta(days=365)
        enrollment = Enrollment(
            applicant=applicant,
            student_id=fake.unique.random_int(min=10000, max=99999),
            program=f"{fake.job()} TEST",
            academic_year=f"{start_date.year}-{end_date.year}",
            start_date=start_date,
            end_date=end_date,
            semester=fake.random_element(
                elements=('FALL', 'SPRING', 'SUMMER')),
            enrollment_status=fake.random_element(
                elements=('ENROLLED', 'WITHDRAWN', 'GRADUATED')),
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            date_of_birth=fake.date_of_birth(minimum_age=18, maximum_age=65),
            gender=fake.random_element(elements=('Male', 'Female')),
            student_email=fake.email(),
            student_phone=fake.phone_number(),
            parent_guardian_name=fake.name(),
            parent_guardian_email=fake.email(),
            parent_guardian_phone=fake.phone_number(),
            address=fake.address(),
            city=fake.city(),
            state=fake.state(),
            zip_code=fake.postcode(),
            previous_school=fake.company(),
            previous_school_address=fake.address(),
            previous_school_phone=fake.phone_number(),
            grade_level=fake.random_element(
                elements=('Freshman', 'Sophomore', 'Junior', 'Senior')),
            special_needs=fake.paragraph(nb_sentences=1),
            allergies=fake.paragraph(nb_sentences=1),
            medications=fake.paragraph(nb_sentences=1)
        )
        enrollment.save()


if __name__ == '__main__':
    num_enrollments = 10  # Change this to the desired number of enrollments
    generate_test_enrollments(num_enrollments)
    print(f"{num_enrollments} test enrollments generated successfully.")
