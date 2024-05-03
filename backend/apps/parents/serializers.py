from rest_framework import serializers
from .models import Parent
from .models import Student


class ParentSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='parent-detail')
    student = serializers.HyperlinkedRelatedField(
        view_name='student-detail',
        queryset=Student.objects.all(),
        lookup_field='student_id',
    )

    class Meta:
        model = Parent
        fields = '__all__'


class ParentUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
