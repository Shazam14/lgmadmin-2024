from django.urls import include, path
from rest_framework import routers
from .views import EnrollmentViewSet

router = routers.DefaultRouter()
router.register(r'', EnrollmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
