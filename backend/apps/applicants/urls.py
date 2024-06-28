from django.urls import include, path
from rest_framework import routers
from .views import ApplicantViewSet, ApplicantApprovalView, validate_applicant, create_applicant, email_test_view

router = routers.DefaultRouter()
router.register(r'', ApplicantViewSet, basename='applicants')

urlpatterns = [
    path('validate_applicant/', validate_applicant, name='validate-applicant'),
    path('create_applicant/', create_applicant, name='create_applicant'),
    path('email_test/', email_test_view, name='email_test'),
    path('approve/<int:applicant_id>/', ApplicantApprovalView.as_view(),
         name='applicant-approval'),
]
urlpatterns += router.urls
