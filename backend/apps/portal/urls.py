# apps/portal/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'', views.PortalViewSet, basename='portal')

urlpatterns = [
    path('', include(router.urls)),
    # Portal-specific auth endpoints
    path('auth/', include([
        path(
            'login/', views.PortalViewSet.as_view({'post': 'login'}), name='portal-login'),
        path(
            'signup/', views.PortalViewSet.as_view({'post': 'signup'}), name='portal-signup'),
        path(
            'logout/', views.PortalViewSet.as_view({'post': 'logout'}), name='portal-logout'),
        path(
            'verify/', views.PortalViewSet.as_view({'get': 'verify'}), name='portal-verify'),
        path(
            'status/', views.PortalViewSet.as_view({'get': 'status'}), name='portal-status'),

    ])),
]
