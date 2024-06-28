from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny
from .models import Grade, Subject, Program
from .serializers import GradeSerializer, ProgramSerializer


class ProgramListView(generics.ListAPIView):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        print(f"Permissions: {self.permission_classes}")
        return super().get(request, *args, **kwargs)


class GradeViewSet(viewsets.ModelViewSet):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        student_id = self.request.query_params.get('student_id')
        subject_id = self.request.query_params.get('subject_id')
        school_year = self.request.query_params.get('school_year')

        if student_id:
            queryset = queryset.filter(student_id=student_id)
        if subject_id:
            queryset = queryset.filter(subject_id=subject_id)
        if school_year:
            queryset = queryset.filter(school_year=school_year)

        return queryset
