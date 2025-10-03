from urllib import request
from django.shortcuts import render, redirect, get_object_or_404
from .models import Mahasiswa
from django.template import loader
from django.http import HttpResponse

# Create your views here.
# def mahasiswa(request):
#     mymahasiswa = Mahasiswa.objects.all().values()
#     template = loader.get_template('mahasiswa.html')

#     context = {
#         'mymahasiswa': mymahasiswa,
#     }

#     return HttpResponse(template.render(context, request))

def mahasiswa(request):
    if request.method == 'POST':
        action = request.POST.get('action')

        if action == 'add':
            Mahasiswa.objects.create(
                nim=request.POST.get('nim'),
                firstname=request.POST.get('firstname'),
                lastname=request.POST.get('lastname'),
                jurusan=request.POST.get('jurusan'),
            )
            return redirect('mahasiswa')
        
        elif action == 'update':
            mhs = Mahasiswa.objects.get(id=request.POST.get('id'))
            mhs.nim = request.POST.get('nim')
            mhs.firstname = request.POST.get('firstname')
            mhs.lastname = request.POST.get('lastname')
            mhs.jurusan = request.POST.get('jurusan')
            mhs.save()
            return redirect('mahasiswa')
        
        elif action == 'delete':
            mhs = Mahasiswa.objects.filter(id=request.POST.get('id')).delete()
            return redirect('mahasiswa')

    mahasiswa = Mahasiswa.objects.all().values()
    template = loader.get_template('mahasiswa.html')
    context = {'mymahasiswa': mahasiswa,}
    return HttpResponse(template.render(context, request))

def home(request):
    return render(request, 'home.html')

