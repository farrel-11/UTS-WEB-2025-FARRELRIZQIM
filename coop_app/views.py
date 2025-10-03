from django.shortcuts import render, redirect, get_object_or_404
from .models import Lowongan, Mahasiswa, LowonganApplication, Sertifikat, LaporanAkhir, LaporanKemajuan
from .forms import KonfirmasiForm, MahasiswaForm, LaporanKemajuanForm, LaporanAkhirForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages



def home(request):
    return render(request, "coop_app/home.html")

@login_required
def dashboard(request):
    return render(request, "coop_app/dashboard.html")

@login_required
def daftar_lowongan(request):
    lowongan = Lowongan.objects.all()
    return render(request, "coop_app/post_lowongan.html", {"lowongan": lowongan})

def daftar_apply(request, pk):
    low = get_object_or_404(Lowongan, pk=pk)
    if request.method == 'POST':
        try:
            mhs = request.user.mahasiswa
        except Mahasiswa.DoesNotExist:
            messages.error(request, "Profil Mahasiswa belum ada, silakan lengkapi profil terlebih dahulu.")
            return redirect('profile')

        if LowonganApplication.objects.filter(mahasiswa=mhs, lowongan=low).exists():
            messages.info(request, "Kamu sudah mendaftar di lowongan ini.")
        else:
            LowonganApplication.objects.create(mahasiswa=mhs, lowongan=low)
            messages.success(request, f"Berhasil mendaftar ke lowongan: {low.judul}")

        return redirect('lowongan')
    return redirect('lowongan')

@login_required
def konfirmasi_magang(request):
    if request.method == 'POST':
        form = KonfirmasiForm(request.POST, request.FILES)
        if form.is_valid():
            obj = form.save(commit=False)
            if hasattr(request.user, 'mahasiswa'):
                obj.mahasiswa = request.user.mahasiswa
            obj.save()
            messages.success(request, 'Konfirmasi magang disimpan.')
            return redirect('dashboard')
    else:
        form = KonfirmasiForm()
    return render(request, "coop_app/konfirmasi_magang.html", {'form': form})

def register(request):
    if request.method == 'POST':
        user_form = UserCreationForm(request.POST)
        mhs_form = MahasiswaForm(request.POST, request.FILES)
        if user_form.is_valid() and mhs_form.is_valid():
            user = user_form.save()
            mahasiswa = mhs_form.save(commit=False)
            mahasiswa.user = user
            mahasiswa.save()
            messages.success(request, 'Akun berhasil dibuat. Silakan login.')
            return redirect('login')
    else:
        user_form = UserCreationForm()
        mhs_form = MahasiswaForm()
    return render(request, 'coop_app/register.html', {'user_form': user_form, 'mhs_form': mhs_form})

@login_required
def profile(request):
    mahasiswa = getattr(request.user, 'mahasiswa', None)
    return render(request, 'coop_app/profile.html', {'mahasiswa': mahasiswa})

@login_required
def laporan_kemajuan(request):
    if request.method == "POST":
        form = LaporanKemajuanForm(request.POST)
        if form.is_valid():
            laporan = form.save(commit=False)
            laporan.mahasiswa = request.user.mahasiswa
            laporan.save()
            messages.success(request, "Laporan kemajuan berhasil disimpan.")
            return redirect("laporan_uts")
    else:
        form = LaporanKemajuanForm()

    laporan_list = LaporanKemajuan.objects.filter(mahasiswa=request.user.mahasiswa)
    return render(request, "coop_app/laporan_uts.html", {
        "form": form,
        "laporan_list": laporan_list,
    })


@login_required
def laporan_akhir(request):
    if request.method == "POST":
        form = LaporanAkhirForm(request.POST, request.FILES)
        if form.is_valid():
            laporan = form.save(commit=False)
            laporan.mahasiswa = request.user.mahasiswa
            laporan.save()
            messages.success(request, "Laporan akhir berhasil disimpan.")
            return redirect("laporan_akhir")
    else:
        form = LaporanAkhirForm()

    laporan_list = LaporanAkhir.objects.filter(mahasiswa=request.user.mahasiswa)
    return render(request, "coop_app/laporan_akhir.html", {
        "form": form,
        "laporan_list": laporan_list,
    })

@login_required
def sertifikat_view(request):
    mhs = getattr(request.user, 'mahasiswa', None)
    if mhs is None:
        certs = Sertifikat.objects.select_related('mahasiswa').order_by('-tanggal_terbit')
        return render(request, 'coop_app/sertifikat.html', {'certs': certs})
    cert = Sertifikat.objects.filter(mahasiswa=mhs).order_by('-tanggal_terbit').first()
    final = LaporanAkhir.objects.filter(mahasiswa=mhs).first()
    return render(request, 'coop_app/sertifikat.html', {'final': final, 'mhs': mhs, 'cert': cert})