# your_app/management/commands/delete_test_applicants.py
from django.core.management.base import BaseCommand
from apps.applicants.models import Applicant


class Command(BaseCommand):
    help = 'Delete test applicants'

    def handle(self, *args, **options):
        test_applicants = Applicant.objects.filter(name__icontains='TEST')
        num_deleted = test_applicants.count()
        test_applicants.delete()
        self.stdout.write(self.style.SUCCESS(
            f"{num_deleted} test applicants deleted successfully."))
