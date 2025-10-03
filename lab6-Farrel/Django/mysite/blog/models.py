from django.db import models

# Create your models here.
class Mahasiswa(models.Model):
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    nim = models.PositiveIntegerField(unique=True)
    jurusan = models.CharField(max_length=50)

    def __str__(self):
        return self.nim