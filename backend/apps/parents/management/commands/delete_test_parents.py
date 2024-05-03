from django.core.management.base import BaseCommand
# Adjust the import according to your project structure
from apps.students.models import Parent


class Command(BaseCommand):
    help = 'Delete test parents'

    def handle(self, *args, **options):
        # Filter parents whose first_name starts with 'Test'
        test_parents = Parent.objects.filter(first_name__startswith='Test')
        # delete returns a tuple where the first item is the count of deleted objects
        count_deleted = test_parents.delete()[0]
        self.stdout.write(self.style.SUCCESS(
            f'Successfully deleted {count_deleted} test parents'))
