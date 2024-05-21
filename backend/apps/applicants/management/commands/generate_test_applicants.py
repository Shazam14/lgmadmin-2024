# your_app/management/commands/generate_test_applicants.py
from django.core.management.base import BaseCommand
from faker import Faker
from apps.applicants.models import Applicant


class Command(BaseCommand):
    help = 'Generate test applicants'

    def add_arguments(self, parser):
        parser.add_argument('num_applicants', type=int,
                            help='Number of test applicants to generate')

    def handle(self, *args, **options):
        num_applicants = options['num_applicants']
        fake = Faker()
        for _ in range(num_applicants):
            applicant = Applicant(
                applicant_id=fake.unique.random_int(min=1000, max=9999),
                name=f"{fake.first_name()} {fake.last_name()} TEST",
                email=fake.email(),
                phone_number=fake.phone_number()[:20],
                course_of_interest=fake.job()[:100],
                application_status=fake.random_element(
                    elements=('Accepted', 'Rejected'))[:20],
                actions=fake.sentence(nb_words=5)
            )
            applicant.save()
        self.stdout.write(self.style.SUCCESS(
            f"{num_applicants} test applicants generated successfully."))
