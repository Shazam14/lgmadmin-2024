from django.urls import include, path
from rest_framework import routers
from apps.announcements.views import AnnouncementViewSet

router = routers.DefaultRouter()
router.register(r'', AnnouncementViewSet)


urlpatterns = [
    path('', include(router.urls)),

]
