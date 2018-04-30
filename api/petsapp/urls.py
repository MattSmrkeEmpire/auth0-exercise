from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('pets', views.PetView)

urlpatterns = [
  path('', include(router.urls))
]
