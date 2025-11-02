from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from basic_api import views

urlpatterns = [
    path('basic/', views.API_objects.as_view()),
    path('basic/<int:pk>/', views.API_objects_detail.as_view()),
    path('dosen/', views.API_dosen.as_view()),
    path('dosen/<int:pk>/', views.API_dosen_detail.as_view()),
    path('mahasiswa/', views.API_mahasiswa.as_view()),
    path('mahasiswa/<int:pk>/', views.API_mahasiswa_detail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)