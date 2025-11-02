from django.shortcuts import get_object_or_404, render, redirect
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

from django.views.decorators.http import require_http_methods
from .models import DRFMahasiswa

def post_list(request):
    """Tampilkan semua data"""
    posts = DRFPost.objects.all()
    return render(request, 'basic_list.html', {'posts': posts})

def post_create(request):
    """Tampilkan form atau buat post baru"""
    if request.method == 'POST':
        name = request.POST.get('name')
        author = request.POST.get('author')
        rating = request.POST.get('rating')
        image = request.FILES.get('image')
        DRFPost.objects.create(name=name, author=author, rating=rating, image=image)
        return redirect('post_list') 
    return render(request, 'basic_post.html')  


def post_delete(request, pk):
    """Hapus data"""
    post = get_object_or_404(DRFPost, pk=pk)
    post.delete()
    return redirect('post_list')


def post_edit(request, pk):
    """Edit data"""
    post = get_object_or_404(DRFPost, pk=pk)
    if request.method == 'POST':
        post.name = request.POST.get('name')
        post.author = request.POST.get('author')
        post.rating = request.POST.get('rating')
        if request.FILES.get('image'):
            post.image = request.FILES['image']
        post.save()
        return redirect('post_list')
    return render(request, 'basic_edit.html', {'post': post})