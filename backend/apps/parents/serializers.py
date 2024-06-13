from rest_framework import serializers
from apps.parents.models import Parent
from apps.students.models import Student
from apps.applicants.models import Applicant
from apps.applicants.serializers import ApplicantSerializer


class ParentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Parent
        fields = '__all__'

    def validate(self, data):
        # Example of basic validation
        if 'phone_number' in data and len(data['phone_number']) < 10:
            raise serializers.ValidationError(
                "Phone number must be at least 10 digits long")
        if 'email' in data and not data['email']:
            raise serializers.ValidationError("Email cannot be empty")
        return data


class ApplicationSerializer(serializers.Serializer):
    parent = ParentSerializer()
    applicant = ApplicantSerializer()

    def create(self, validated_data):
        parent_data = validated_data.pop('parent')
        applicant_data = validated_data.pop('applicant')

        parent = Parent.objects.create(**parent_data)
        applicant = Applicant.objects.create(parent=parent, **applicant_data)

        return {'parent': parent, 'applicant': applicant}


class ParentUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
