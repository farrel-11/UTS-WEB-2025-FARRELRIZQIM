from django.contrib import admin
from .models import DRFPost, DRFDosen, DRFMahasiswa

# Register your models here.
admin.site.register(DRFPost)
admin.site.register(DRFDosen)
admin.site.register(DRFMahasiswa)
