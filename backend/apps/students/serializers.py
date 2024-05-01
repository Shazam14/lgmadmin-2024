from rest_framework import serializers
from .models import Student


class StudentSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='student-detail', lookup_field='student_id')

    class Meta:
        model = Student
        fields = '__all__'

class StudentUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
