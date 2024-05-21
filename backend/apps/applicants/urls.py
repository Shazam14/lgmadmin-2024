from django.urls import include, path
from rest_framework import routers
from .views import ApplicantViewSet, ApplicantApprovalView

router = routers.DefaultRouter()
router.register(r'', ApplicantViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('approve/<int:applicant_id>/', ApplicantApprovalView.as_view(),
         name='applicant-approval'),

]
