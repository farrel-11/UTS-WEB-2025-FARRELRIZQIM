from django import forms
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import KonfirmasiMagang, LaporanAkhir, LaporanKemajuan, Mahasiswa

class KonfirmasiForm(forms.ModelForm):
    class Meta:
        model = KonfirmasiMagang
        fields = ["periode","posisi","nama_perusahaan","alamat_perusahaan","bidang_usaha", "nama_supervisor", "email_supervisor", "wa_supervisor","surat_konfirmasi",]

class LaporanKemajuanForm(forms.ModelForm):
    class Meta:
        model = LaporanKemajuan
        fields = ["profil_perusahaan", "jobdesk", "suasana_kerja", 
                  "pembelajaran_berguna", "kebutuhan_perusahaan", "bulan"]

class LaporanAkhirForm(forms.ModelForm):
    class Meta:
        model = LaporanAkhir
        fields = ["ringkasan", "file_laporan"]

class MahasiswaForm(forms.ModelForm):
    class Meta:
        model = Mahasiswa
        exclude = ['user']
    def init(self, args, **kwargs):
        super().init(args, **kwargs)
        for f in self.fields.values():
            f.widget.attrs.update({'class':'form-control'})

@login_required
def laporan_kemajuan(request):
    if request.method == "POST":
        form = LaporanKemajuanForm(request.POST)
        if form.is_valid():
            laporan = form.save(commit=False)
            laporan.mahasiswa = request.user.mahasiswa
            laporan.save()
            return redirect("laporan_kemajuan")
    else:
        form = LaporanKemajuanForm()

    laporan_list = LaporanKemajuan.objects.filter(mahasiswa=request.user.mahasiswa)
    return render(request, "coop_app/laporan_kemajuan.html", {"form": form, "laporan_list": laporan_list})


@login_required
def laporan_akhir(request):
    if request.method == "POST":
        form = LaporanAkhirForm(request.POST, request.FILES)
        if form.is_valid():
            laporan = form.save(commit=False)
            laporan.mahasiswa = request.user.mahasiswa
            laporan.save()
            return redirect("laporan_akhir")
    else:
        form = LaporanAkhirForm()

    laporan = LaporanAkhir.objects.filter(mahasiswa=request.user.mahasiswa).first()
    return render(request, "coop_app/laporan_akhir.html", {"form": form, "laporan": laporan})