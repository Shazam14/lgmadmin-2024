from django.core.management.base import BaseCommand
import random
from faker import Faker
from apps.students.models import Student
from apps.grades.models import Subject, Grade


class Command(BaseCommand):
    help = 'Generate test grade data'

    def add_arguments(self, parser):
        # Adding a command-line option to specify the number of entries to generate
        parser.add_argument('num_entries', type=int,
                            help='Number of test grade entries to generate')

    def handle(self, *args, **options):
        fake = Faker()

        # Fetch all students and subjects
        students = list(Student.objects.all())
        subjects = list(Subject.objects.all())

        if not students or not subjects:
            self.stdout.write(self.style.ERROR(
                'Please ensure there are students and subjects in the database.'))
            return

        # Get the number of entries from command-line arguments
        num_entries = options['num_entries']

        # Define sample data
        school_years = ['2020-2021', '2021-2022', '2022-2023']
        # Grades 1 to 12 plus Kindergarten
        grade_levels = ['Grade ' + str(i) for i in range(1, 13)] + ['K']

        # Function to assign grades based on percentage
        def assign_grade(percentage):
            if percentage >= 90:
                return 'A'
            elif 85 <= percentage < 90:
                return 'P'
            elif 80 <= percentage < 85:
                return 'AP'
            elif 75 <= percentage < 80:
                return 'D'
            else:
                return 'B'

        # Generate grades
        for _ in range(num_entries):  # Generate grade entries based on specified count
            q1 = random.randint(70, 100)
            q2 = random.randint(70, 100)
            q3 = random.randint(70, 100)
            q4 = random.randint(70, 100)
            # Calculate average to determine final grade
            final = int((q1 + q2 + q3 + q4) / 4)

            Grade.objects.create(
                student=random.choice(students),
                subject=random.choice(subjects),
                school_year=random.choice(school_years),
                grade_section=random.choice(grade_levels),
                q1_grade=assign_grade(q1),
                q2_grade=assign_grade(q2),
                q3_grade=assign_grade(q3),
                q4_grade=assign_grade(q4),
                final_grade=assign_grade(final),
                # Append "Test Entry" for easy identification
                remarks=f"Test Entry - {fake.word()}"
            )

        self.stdout.write(self.style.SUCCESS(
            f'Successfully generated {num_entries} test grade entries.'))
