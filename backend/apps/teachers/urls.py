from django.urls import include, path
from rest_framework import routers
from .views import TeacherViewSet

router = routers.DefaultRouter()
router.register(r'', TeacherViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
