from rest_framework import serializers
from basic_api.models import DRFPost, DRFDosen, DRFMahasiswa

class DRFPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = DRFPost
        fields = '__all__'

class DRFPostDosenSerializer(serializers.ModelSerializer):
    class Meta:
        model = DRFDosen
        fields = '__all__'

class DRFPostMahasiswaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DRFMahasiswa
        fields = '__all__'