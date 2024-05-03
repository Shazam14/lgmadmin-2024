from django.contrib import admin
from .models import Parent


class ParentAdmin(admin.ModelAdmin):
    list_display = ('parent_id', 'first_name', 'student', 'parent_id')
    list_filter = ('student', 'account_status')
    search_fields = ('parent_id', 'first_name')


admin.site.register(Parent)
