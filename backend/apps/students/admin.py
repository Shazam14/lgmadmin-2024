from django.contrib import admin
from .models import Student


# Register your models here.


class StudentAdmin(admin.ModelAdmin):
    list_display = ('student_id', 'name', 'tuition_status', 'account_status')
    list_filter = ('tuition_status', 'account_status')
    search_fields = ('student_id', 'name')


admin.site.register(Student)
