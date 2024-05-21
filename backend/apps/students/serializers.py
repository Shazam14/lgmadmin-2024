from rest_framework import serializers
from .models import Student


class StudentSerializer(serializers.HyperlinkedModelSerializer):
    parents = serializers.HyperlinkedRelatedField(
        view_name='parent-detail',
        many=True,
        read_only=True)

    class Meta:
        model = Student
        fields = ['id', 'first_name', 'middle_name', 'last_name', 'gender', 'age', 'birthday',
                  'email', 'student_id', 'student_status', 'grade', 'section',
                  'tuition_notes', 'tuition_status', 'account_status', 'parents']
        extra_kwargs = {
            'url': {'lookup_field': 'student_id'}
        }


class StudentUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
