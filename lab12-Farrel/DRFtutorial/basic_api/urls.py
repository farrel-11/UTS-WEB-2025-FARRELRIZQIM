from django.urls import path
from basic_api import views

urlpatterns = [
    path('basic/', views.API_objects.as_view()),
    path('basic/<int:pk>/', views.API_objects_detail.as_view()),
    path('dosen/', views.API_dosen.as_view()),
    path('dosen/<int:pk>/', views.API_dosen_detail.as_view()),
    path('mahasiswa/', views.API_mahasiswa.as_view()),
    path('mahasiswa/<int:pk>/', views.API_mahasiswa_detail.as_view()),
    path('', views.post_list, name='post_list'),
    path('create/', views.post_create, name='post_create'),
    path('edit/<int:pk>/', views.post_edit, name='post_edit'),
    path('delete/<int:pk>/', views.post_delete, name='post_delete'),
]
