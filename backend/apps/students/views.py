from rest_framework import viewsets, generics, parsers, response
from .models import Student
from .serializers import StudentSerializer, StudentUploadSerializer
from django.http import JsonResponse


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class StudentUploadView(generics.CreateAPIView):
    serializer_class = StudentUploadSerializer
    parser_classes = [parsers.MultiPartParser]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        file = serializer.validated_data['file']
        # Process the uploaded file and create student records
        # ...
        return response.Response({'message': 'Students uploaded successfully'}, status=201)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
