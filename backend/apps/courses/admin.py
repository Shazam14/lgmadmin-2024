# courses/admin.py
from django.contrib import admin
from .models import Course


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('course_id', 'name', 'teacher_assigned',
                    'phone_number', 'course_status')
    list_filter = ('course_status',)
    search_fields = ('course_id', 'name', 'teacher_assigned__name')
