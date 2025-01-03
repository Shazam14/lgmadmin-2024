"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from .views import home
from api.views import api_root, SignupView, LoginView, LogoutView, AuthStatusView, user_role
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from oauth2_provider.views import TokenView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include([
        path('', api_root, name='api_root'),
        # Ensures that it maps to /api/students/
        path('students/', include('apps.students.urls')),
        path('teachers/', include('apps.teachers.urls')),
        path('courses/', include('apps.courses.urls')),
        path('applicants/', include('apps.applicants.urls')),
        path('enrollments/', include('apps.enrollments.urls')),
        path('parents/', include('apps.parents.urls')),
        path('grades/', include('apps.grades.urls')),
        path('announcements/', include('apps.announcements.urls')),

        # for portal
        path('accounts/', include('apps.accounts.urls')),
        path('portal/', include('apps.portal.urls')),
        # for authentication
        path('login/', LoginView.as_view(), name='login'),
        path('signup/', SignupView.as_view(), name='signup'),
        path('logout/', LogoutView.as_view(), name='logout'),
        path('auth-status/', AuthStatusView.as_view(), name='auth-status'),
        path('user-role/', user_role, name='user_role'),


    ])),
    # for authentication
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('oauth/', include('oauth2_provider.urls', namespace='oauth2_provider')),
]
