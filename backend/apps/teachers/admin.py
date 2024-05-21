from django.contrib import admin

from .models import Teacher

# Register your models here.


class TeacherAdmin(admin.ModelAdmin):
    list_display = ('teacher_id', 'name', 'email',
                    'phone_number', 'assigned_course', 'account_status')
    list_filter = ('name', 'account_status')
    search_fields = ('teacher_id', 'name')


admin.site.register(Teacher)
