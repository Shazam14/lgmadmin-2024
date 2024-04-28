# delete_test_enrollments.py
from apps.enrollments.models import Enrollment
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project.settings')
django.setup()


def delete_test_enrollments():
    test_enrollments = Enrollment.objects.filter(program__icontains='TEST')
    num_deleted = test_enrollments.count()
    test_enrollments.delete()
    print(f"{num_deleted} test enrollments deleted successfully.")


if __name__ == '__main__':
    delete_test_enrollments()
