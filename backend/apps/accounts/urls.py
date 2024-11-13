# accounts/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'accounts', views.AccountViewSet, basename='account')

urlpatterns = [
    path('', include(router.urls)),
    path('portal/signup/', views.portal_signup, name='portal-signup'),
    path('portal/login/', views.portal_login, name='portal-login'),
    # Change these to use the correct view classes
    path('portal/parent-profile/',
         views.ParentProfileView.as_view(),  # Updated view name
         name='parent-profile'),
    path('portal/student-profile/',
         views.StudentProfileView.as_view(),  # Updated view name
         name='student-profile'),
]
