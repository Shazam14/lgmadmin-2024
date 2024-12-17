# apps/portal/serializers.py
from rest_framework import serializers
from apps.accounts.models import UserProfile


class PortalUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['user', 'user_type', 'parent', 'student',
                  'last_login_ip', 'created_at', 'updated_at']
