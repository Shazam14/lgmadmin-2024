from django.core.management.base import BaseCommand
from apps.grades.models import Grade


class Command(BaseCommand):
    help = 'Delete test grade data'

    def handle(self, *args, **options):
        # Define the criterion for identifying test grades
        # For example, we assume that test data has remarks 'Test'
        test_grades = Grade.objects.filter(remarks='Test')
        count = test_grades.count()

        # Delete these test grades
        test_grades.delete()

        self.stdout.write(self.style.SUCCESS(
            f'Successfully deleted {count} test grade entries.'))
