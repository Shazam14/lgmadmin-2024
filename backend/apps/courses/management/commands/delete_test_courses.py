# delete_test_courses.py
from apps.courses.models import Course
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()


def delete_test_courses():
    test_courses = Course.objects.filter(name__icontains='TEST')
    num_deleted = test_courses.count()
    test_courses.delete()
    print(f"{num_deleted} test courses deleted successfully.")


if __name__ == '__main__':
    delete_test_courses()
