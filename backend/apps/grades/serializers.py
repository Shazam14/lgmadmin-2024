from rest_framework import serializers
from .models import Subject, Grade


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'name']


class GradeSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(read_only=True)
    student_url = serializers.HyperlinkedRelatedField(
        view_name='student-detail',
        source='student',
        read_only=True,
        lookup_field='student_id')

    class Meta:
        model = Grade
        fields = ['id', 'student', 'student_url', 'subject', 'school_year', 'grade_section',
                  'q1_grade', 'q2_grade', 'q3_grade', 'q4_grade', 'final_grade', 'remarks']
