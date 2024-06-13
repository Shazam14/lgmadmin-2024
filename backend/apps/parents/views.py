import logging
from rest_framework import status
from rest_framework import viewsets, generics, parsers, response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import Parent
from .serializers import ParentSerializer, ParentUploadSerializer
from django.http import JsonResponse
from rest_framework.response import Response


logger = logging.getLogger(__name__)


@api_view(['POST'])
def validate_parent(request):
    serializer = ParentSerializer(data=request.data)
    if serializer.is_valid():
        return response.Response({"message": "Parent data is valid"}, status=status.HTTP_200_OK)
    return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ParentViewSet(viewsets.ModelViewSet):
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer
    permission_classes = [IsAuthenticated]


class ParenttUploadView(generics.CreateAPIView):
    serializer_class = ParentUploadSerializer
    parser_classes = [parsers.MultiPartParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        file = serializer.validated_data['file']
        return response.Response({'message': 'Parents upload successfully'}, status=201)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
