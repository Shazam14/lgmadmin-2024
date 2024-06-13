from rest_framework import serializers
from .models import Subject, Grade, Program


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = ['id', 'name', 'description', 'age_range']


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
        fields = ['id', 'student', 'subject', 'written_work',
                  'performance_task', 'quarterly_exam', 'quarterly_grade', 'final_grade', 'evaluation_code', 'remedial_passed', 'cle_mve_grade', 'student_url']
