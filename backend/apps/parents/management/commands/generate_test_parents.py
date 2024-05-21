from django.core.management.base import BaseCommand
from faker import Faker
from apps.students.models import Student
from apps.parents.models import Parent


class Command(BaseCommand):
    help = 'Generate test parents for students'

    def add_arguments(self, parser):
        parser.add_argument('count', type=int,
                            help='Number of test parents to create')

    def handle(self, *args, **options):
        fake = Faker()
        count = options['count']

        # Fetch students who don't have any parents assigned
        students_without_parents = Student.objects.filter(parents=None)

        if not students_without_parents:
            self.stdout.write(self.style.WARNING(
                'All students already have parents assigned.'))
            return

        for _ in range(count):
            if not students_without_parents:
                break

            student = students_without_parents.first()

            # First name now always starts with 'Test'
            first_name = f"Test {fake.first_name()}"
            parent = Parent.objects.create(
                first_name=first_name,
                last_name=fake.last_name(),
                email=fake.email(),
                phone_number=fake.phone_number()[:15],
                street_address=fake.street_address(),
                city=fake.city(),
                state_province=fake.state(),
                parent_id=fake.unique.random_number(digits=10),
                account_status='Active',
                relationship=fake.random_element(
                    ['Mother', 'Father', 'Guardian']),
                primary_contact=fake.phone_number()[:15],
                secondary_contact=fake.phone_number()[:15],
                contact_priority=fake.random_element(['Primary', 'Secondary'])
            )
            parent.students.add(student)

            # Remove the student from the list of students without parents
            students_without_parents = students_without_parents.exclude(
                id=student.id)

        self.stdout.write(self.style.SUCCESS(
            f'Successfully created {count} test parents'))
