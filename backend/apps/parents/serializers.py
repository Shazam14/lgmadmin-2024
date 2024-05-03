from rest_framework import serializers
from .models import Parent


class ParentSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='parent-detail', lookup_field='')

    class Meta:
        model = Parent
        fields = '__all__'


class ParentUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
