# students/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ParentViewSet, validate_parent

router = DefaultRouter()
router.register(r'', ParentViewSet)

urlpatterns = [
    path('validate_parent/', validate_parent, name='validate-parent'),
]

urlpatterns += router.urls
