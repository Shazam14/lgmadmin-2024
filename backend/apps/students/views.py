from rest_framework import viewsets, generics, parsers, response
from rest_framework_simplejwt.authentication import JWTAuthentication

from rest_framework.permissions import IsAuthenticated
from .models import Student
from .serializers import StudentSerializer, StudentUploadSerializer
from django.http import JsonResponse

from rest_framework.decorators import action


@action(detail=True, methods=['get'])
def vaccinations(self, request, pk=None):
    student = self.get_object()
    return Response(student.medical.get_vaccination_summary())


@action(detail=True, methods=['post'])
def add_vaccination(self, request, pk=None):
    student = self.get_object()
    student.medical.add_vaccination(
        vaccine_name=request.data['vaccine_name'],
        dose_date=request.data['dose_date'],
        batch_number=request.data['batch_number'],
        healthcare_provider=request.data['healthcare_provider'],
        next_due_date=request.data.get('next_due_date')
    )
    return Response(status=201)


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    lookup_field = 'student_id'
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]


class StudentUploadView(generics.CreateAPIView):
    serializer_class = StudentUploadSerializer
    parser_classes = [parsers.MultiPartParser]
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

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

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        print("retrieving lists Django Student Views")
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


class StudentPortalViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['get'])
    def full_profile(self, request, pk=None):
        student = self.get_object()
        return Response(student.get_full_profile())
