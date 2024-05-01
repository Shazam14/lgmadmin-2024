# students/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, StudentUploadView

router = DefaultRouter()
router.register(r'', StudentViewSet, basename='student')

urlpatterns = [
    path('', include(router.urls)),
    path('upload/', StudentUploadView.as_view(), name='student-upload'),
]
