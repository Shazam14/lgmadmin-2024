from django.core.management.base import BaseCommand
from faker import Faker
# Adjust the import according to your project structure
from apps.students.models import Student, Parent


class Command(BaseCommand):
    help = 'Generate test parents for students'

    def add_arguments(self, parser):
        parser.add_argument('count', type=int,
                            help='Number of test parents to create')

    def handle(self, *args, **options):
        fake = Faker()
        count = options['count']
        # Fetch all students to associate parents with
        students = list(Student.objects.all())

        if not students:
            self.stdout.write(self.style.WARNING(
                'No students found in the database.'))
            return

        for _ in range(count):
            # First name now always starts with 'Test'
            first_name = f"Test {fake.first_name()}"

            Parent.objects.create(
                first_name=first_name,
                last_name=fake.last_name(),
                email=fake.email(),
                phone_number=fake.phone_number(),
                street_address=fake.street_address(),
                city=fake.city(),
                state_province=fake.state(),
                student=fake.random_element(students),
                parent_id=fake.unique.random_number(digits=10),
                account_status='Active',
                relationship=fake.random_element(
                    ['Mother', 'Father', 'Guardian']),
                primary_contact=fake.phone_number(),
                secondary_contact=fake.phone_number(),
                contact_priority=fake.random_element(['Primary', 'Secondary'])
            )
        self.stdout.write(self.style.SUCCESS(
            f'Successfully created {count} test parents'))
