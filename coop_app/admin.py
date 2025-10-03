from django.contrib import admin
from .models import Mahasiswa, Lowongan, LowonganApplication, KonfirmasiMagang, LaporanKemajuan, LaporanAkhir, Sertifikat

@admin.register(KonfirmasiMagang)
class KonfirmasiMagangAdmin(admin.ModelAdmin):
    list_display = ("mahasiswa", "nama_perusahaan", "periode", "posisi", "status", "tanggal")
    list_filter = ("status", "nama_perusahaan")
    search_fields = ("mahasiswauserusername", "nama_perusahaan", "posisi")

    actions = ["set_diterima", "set_ditolak", "terbitkan_sertifikat"]

    def set_diterima(self, request, queryset):
        queryset.update(status="diterima")
        self.message_user(request, "Konfirmasi magang berhasil diterima.")

    def set_ditolak(self, request, queryset):
        queryset.update(status="ditolak")
        self.message_user(request, "Konfirmasi magang berhasil ditolak.")

    def terbitkan_sertifikat(self, request, queryset):
        count = 0
        for konfirmasi in queryset.filter(status="diterima"):
            if not hasattr(konfirmasi, "sertifikat"):
                Sertifikat.objects.create(mahasiswa=konfirmasi.mahasiswa, konfirmasi=konfirmasi)
                count += 1
        self.message_user(request, f"{count} sertifikat berhasil diterbitkan.")

    set_diterima.short_description = "Setujui konfirmasi magang"
    set_ditolak.short_description = "Tolak konfirmasi magang"
    terbitkan_sertifikat.short_description = "Terbitkan sertifikat untuk mahasiswa terpilih"

@admin.register(LowonganApplication)
class LowonganApplicationAdmin(admin.ModelAdmin):
    list_display = ("mahasiswa", "lowongan", "tanggal_daftar", "status")
    list_filter = ("status", "lowongan")
    search_fields = ("mahasiswauserusername", "lowongan__judul")

admin.site.register(Mahasiswa)
admin.site.register(Lowongan)
admin.site.register(LaporanKemajuan)
admin.site.register(LaporanAkhir)
admin.site.register(Sertifikat)