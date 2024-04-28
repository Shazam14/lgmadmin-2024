from rest_framework import serializers
from .models import Student


class StudentSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='student-detail')

    class Meta:
        model = Student
        fields = ['url', 'student_id', 'name', 'birthday', 'email',
                  'tuition_notes', 'tuition_status', 'account_status']


class StudentUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
