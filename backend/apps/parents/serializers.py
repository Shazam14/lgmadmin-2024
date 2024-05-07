from rest_framework import serializers
from apps.parents.models import Parent
from apps.students.models import Student


class ParentSerializer(serializers.ModelSerializer):
    students = serializers.StringRelatedField(many=True)
    """ students = serializers.HyperlinkedRelatedField(
        view_name='student-detail',
        queryset=Student.objects.all(),
        many=True,
        lookup_field='student_id'
    ) """

    class Meta:
        model = Parent
        fields = '__all__'

    # previous version before enrollment to students change
    """ class Meta:
        model = Parent
        fields = ['id', 'first_name', 'middle_name', 'last_name', 'email', 'phone_number',
                  'street_address', 'city', 'state_province', 'parent_id', 'account_status',
                  'relationship', 'primary_contact', 'secondary_contact', 'contact_priority', 'students']
 """


class ParentUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
