from django.core.management.base import BaseCommand
# Replace 'your_app' with the actual name of your app
from apps.students.models import Student


class Command(BaseCommand):
    help = 'Delete test students'

    def handle(self, *args, **options):
        test_students = Student.objects.filter(name__startswith='Test')
        num_deleted = test_students.delete()[0]
        self.stdout.write(self.style.SUCCESS(
            f'Successfully deleted {num_deleted} test students'))
