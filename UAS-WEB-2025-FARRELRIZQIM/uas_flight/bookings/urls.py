from django.urls import path
from . import views

urlpatterns = [
    path('', views.search_view, name='flight_search'),
    path('results/', views.result_view, name='flight_result'),
    path('booking/', views.booking_view, name='flight_booking'),
]