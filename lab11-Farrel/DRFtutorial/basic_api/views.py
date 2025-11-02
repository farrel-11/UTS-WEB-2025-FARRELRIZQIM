from django.shortcuts import render
from rest_framework import generics
from basic_api.models import DRFPost, DRFDosen, DRFMahasiswa
from basic_api.serializers import DRFPostSerializer, DRFPostDosenSerializer, DRFPostMahasiswaSerializer

# Create your views here.
class API_objects(generics.ListCreateAPIView):
    queryset = DRFPost.objects.all()
    serializer_class = DRFPostSerializer

class API_objects_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset = DRFPost.objects.all()
    serializer_class = DRFPostSerializer

class API_dosen(generics.ListCreateAPIView):
    queryset = DRFDosen.objects.all()
    serializer_class = DRFPostDosenSerializer

class API_mahasiswa(generics.ListCreateAPIView):
    queryset = DRFMahasiswa.objects.all()
    serializer_class = DRFPostMahasiswaSerializer

class API_dosen_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset = DRFDosen.objects.all()
    serializer_class = DRFPostDosenSerializer


class API_mahasiswa_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset = DRFMahasiswa.objects.all()
    serializer_class = DRFPostMahasiswaSerializer