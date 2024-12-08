# apps/portal/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Create routers for different view sets
portal_router = DefaultRouter()
portal_router.register(r'', views.PortalViewSet, basename='portal')

# Simplified student router - note the change in prefix
student_router = DefaultRouter()
student_router.register(
    r'student', views.StudentPortalViewSet, basename='student-portal')

# Admin router
admin_router = DefaultRouter()
admin_router.register(r'admin', views.AdminPortalViewSet,
                      basename='admin-portal')

urlpatterns = [
    # Include routers
    path('', include(portal_router.urls)),
    path('', include(student_router.urls)),
    path('', include(admin_router.urls)),

    # Auth endpoints
    path('auth/', include([
        path('login/',
             views.PortalViewSet.as_view({'post': 'login'}),
             name='portal-login'),
        path('signup/',
             views.PortalViewSet.as_view({'post': 'signup'}),
             name='portal-signup'),
        path('logout/',
             views.PortalViewSet.as_view({'post': 'logout'}),
             name='portal-logout'),
        path('verify/',
             views.PortalViewSet.as_view({'get': 'verify'}),
             name='portal-verify'),
        path('status/',
             views.PortalViewSet.as_view({'get': 'status'}),
             name='portal-status'),
    ])),
]
