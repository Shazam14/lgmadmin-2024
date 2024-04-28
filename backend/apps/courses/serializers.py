# courses/serializers.py
from rest_framework import serializers
from .models import Course
from apps.teachers.serializers import TeacherSerializer


class CourseSerializer(serializers.ModelSerializer):
    teacher_assigned = TeacherSerializer(read_only=True)

    class Meta:
        model = Course
        fields = '__all__'
