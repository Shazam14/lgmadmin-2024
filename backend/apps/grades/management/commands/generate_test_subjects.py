from django.core.management.base import BaseCommand
from apps.grades.models import Subject


class Command(BaseCommand):
    help = 'Generate test subjects based on Philippine K-12 curriculum'

    def handle(self, *args, **options):
        # Define subjects by grade level
        subjects_by_grade = {
            'Grade 1': ['Reading and literacy', 'language', 'mathematics', 'Makabansa', 'GMRC'],
            'Grade 2': ['Filipino', 'English', 'math', 'Makabansa', 'GMRC'],
            'Grade 3': ['Filipino', 'English', 'math', 'Makabansa', 'GMRC', 'science'],
            'Grade 4 to 10': ['Filipino', 'English', 'math', 'science', 'Araling Panlipunan', 'technology and livelihood education', 'GMRC', 'MAPEH']
        }

        # Ensure unique subjects across all grades
        all_subjects = set()
        for grade, subjects in subjects_by_grade.items():
            all_subjects.update(subjects)

        # Create Subject instances
        created_count = 0
        for subject_name in all_subjects:
            subject, created = Subject.objects.get_or_create(name=subject_name)
            if created:
                created_count += 1

        self.stdout.write(self.style.SUCCESS(
            f'Successfully created {created_count} new subjects.'))
