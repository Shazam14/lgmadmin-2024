# enrollment/serializers.py
from rest_framework import serializers
from .models import Enrollment
from apps.applicants.serializers import ApplicantSerializer


class EnrollmentSerializer(serializers.ModelSerializer):
    applicant = ApplicantSerializer()
    grade_level = serializers.StringRelatedField()
    subjects = serializers.StringRelatedField(many=True)

    class Meta:
        model = Enrollment
        fields = '__all__'
