# api/views.py

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


@api_view(['GET'])
def api_root(request):
    return Response({
        'students': reverse('student-list', request=request),
        'courses': reverse('course-list', request=request),
        'teachers': reverse('teacher-list', request=request),
        'applicants': reverse('applicant-list', request=request),
        'student_upload': reverse('student-upload', request=request),
        'parents': reverse('parent-list', request=request),
    })
