from django.db import models

# Create your models here.

Grade = [
    ('excellent', 1),
    ('average', 0),
    ('bad', -1)
]

class DRFPost(models.Model):
    name = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    upload = models.DateTimeField(auto_now_add=True)
    rating = models.CharField(max_length=10, choices=Grade, default='average')

    class Meta:
        ordering = ['-upload']

    def __str__(self):
        return self.name
    
class DRFDosen(models.Model):
    nama = models.CharField(max_length=100)
    prodi = models.CharField(max_length=100)

    def __str__(self):
        return self.nama

class DRFMahasiswa(models.Model):
    mentor = models.ForeignKey(DRFDosen, on_delete=models.CASCADE)
    nama = models.CharField(max_length=100)
    nim = models.CharField(max_length=100)

    class Meta:
        ordering = ['nama']

    def __str__(self):
        return self.nama