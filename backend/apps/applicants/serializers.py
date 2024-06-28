# serializers.py
from rest_framework import serializers
from .models import Applicant
from apps.grades.models import Program
# Ensure this is the correct import for the Parent model
from apps.parents.models import Parent


class ApplicantSerializer(serializers.ModelSerializer):
    parent = serializers.PrimaryKeyRelatedField(queryset=Parent.objects.all())
    program_option = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Program.objects.all()
    )
    reference_number = serializers.CharField(read_only=True)

    class Meta:
        model = Applicant
        fields = '__all__'

    def validate_program_option(self, value):
        try:
            program = Program.objects.get(name=value)
            return program
        except Program.DoesNotExist:
            raise serializers.ValidationError("Program not found.")

    def validate(self, data):
        if data['age'] < 0:
            raise serializers.ValidationError("Age cannot be negative")
        return data
