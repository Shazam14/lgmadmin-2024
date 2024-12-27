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
    subject = serializers.SerializerMethodField()

    class Meta:
        model = Grade
        fields = ['subject', 'written_work', 'performance_task', 'quarterly_exam',
                  'quarterly_grade', 'final_grade', 'evaluation_code',
                  'remedial_passed', 'cle_mve_grade']

    def get_subject(self, obj):
        if obj.subject:
            return {
                'id': obj.subject.id,
                'name': obj.subject.name,
                'description': obj.subject.description or ''
            }
        return None
