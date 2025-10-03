from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Mahasiswa(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nim = models.CharField(max_length=20, unique=True)
    program_studi = models.CharField(max_length=100)
    angkatan = models.IntegerField()
    jenis_kelamin = models.CharField(max_length=10)
    email_outlook = models.EmailField()
    kontak_wa = models.CharField(max_length=15)
    bukti_konsultasi = models.FileField(upload_to='bukti/', null=True, blank=True)
    sptjm = models.FileField(upload_to='sptjm/', null=True, blank=True)
    cv = models.FileField(upload_to='cv/', null=True, blank=True)
    portfolio = models.FileField(upload_to='portfolio/', null=True, blank=True)
    def __str__(self):
        return self.user.username

class Lowongan(models.Model):
    judul = models.CharField(max_length=200)
    perusahaan = models.CharField(max_length=200)
    deskripsi = models.TextField()
    tanggal_post = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.judul
    
class LowonganApplication(models.Model):
    mahasiswa = models.ForeignKey(Mahasiswa, on_delete=models.CASCADE)
    lowongan = models.ForeignKey(Lowongan, on_delete=models.CASCADE)
    tanggal_daftar = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=[("pending", "Pending"), ("diterima", "Diterima"), ("ditolak", "Ditolak")],
        default="pending"
    )

    def __str__(self):
        return f"{self.mahasiswa.user.username} daftar {self.lowongan.judul}"


class KonfirmasiMagang(models.Model):
    mahasiswa = models.ForeignKey(Mahasiswa, on_delete=models.CASCADE)

    periode = models.CharField(max_length=100)  
    posisi = models.CharField(max_length=100)

    nama_perusahaan = models.CharField(max_length=200)
    alamat_perusahaan = models.TextField()
    bidang_usaha = models.CharField(max_length=200)

    nama_supervisor = models.CharField(max_length=150)
    email_supervisor = models.EmailField()
    wa_supervisor = models.CharField(max_length=20, blank=True, null=True)

    surat_konfirmasi = models.FileField(upload_to='magang/')
    tanggal = models.DateTimeField(auto_now_add=True)

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("diterima", "Diterima"),
        ("ditolak", "Ditolak"),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="pending")

    def __str__(self):
        return f"{self.mahasiswa.user.username} - {self.nama_perusahaan}"

class LaporanKemajuan(models.Model):
    mahasiswa = models.ForeignKey(Mahasiswa, on_delete=models.CASCADE)
    profil_perusahaan = models.TextField()
    jobdesk = models.TextField()
    suasana_kerja = models.TextField()
    pembelajaran_berguna = models.TextField()
    kebutuhan_perusahaan = models.TextField()
    bulan = models.PositiveIntegerField()
    tanggal_submit = models.DateTimeField(auto_now_add=True)  

    def __str__(self):
        return f"Laporan Kemajuan {self.mahasiswa.user.username} - Bulan {self.bulan}"


class LaporanAkhir(models.Model):
    mahasiswa = models.ForeignKey(Mahasiswa, on_delete=models.CASCADE)
    ringkasan = models.TextField(blank=True, null=True)  
    file_laporan = models.FileField(upload_to="laporan_akhir/", blank=True, null=True)
    tanggal_submit = models.DateTimeField(auto_now_add=True) 

    def __str__(self):
        return f"Laporan Akhir {self.mahasiswa.user.username}"


class Sertifikat(models.Model):
    mahasiswa = models.ForeignKey(Mahasiswa, on_delete=models.CASCADE)
    konfirmasi = models.OneToOneField("KonfirmasiMagang", on_delete=models.CASCADE)
    tanggal_terbit = models.DateTimeField(default=timezone.now) 
    catatan = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Sertifikat {self.mahasiswa.user.username}"