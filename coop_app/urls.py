from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
urlpatterns = [
    path('', views.home, name='home'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('lowongan/', views.daftar_lowongan, name='lowongan'),
    path('lowongan/<int:pk>/daftar/', views.daftar_apply, name='daftar_apply'),
    path('konfirmasi/', views.konfirmasi_magang, name='konfirmasi'),
    path('register/', views.register, name='register'),
    path('profile/', views.profile, name='profile'),
    path('login/', auth_views.LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path("laporan_uts/", views.laporan_kemajuan, name="laporan_kemajuan"),
    path("laporan_akhir/", views.laporan_akhir, name="laporan_akhir"),
    path("sertifikat/", views.sertifikat_view, name="sertifikat"),

]