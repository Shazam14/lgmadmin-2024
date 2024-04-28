# delete_test_teachers.py
from apps.teachers.models import Teacher
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()


def delete_test_teachers():
    test_teachers = Teacher.objects.filter(name__icontains='TEST')
    num_deleted = test_teachers.count()
    test_teachers.delete()
    print(f"{num_deleted} test teachers deleted successfully.")


if __name__ == '__main__':
    delete_test_teachers()
