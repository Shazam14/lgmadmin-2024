from django.urls import include, path
from rest_framework import routers
from .views import CourseViewSet

router = routers.DefaultRouter()
router.register(r'', CourseViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
