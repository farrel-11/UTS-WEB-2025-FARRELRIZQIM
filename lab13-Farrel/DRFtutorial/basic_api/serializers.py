from rest_framework import serializers
from basic_api.models import DRFPost

class DRFPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = DRFPost
        fields = '__all__'

image_url = serializers.SerializerMethodField()
def get_image_url(self, obj):
    request = self.context.get('request')
    if obj.image and request:
        return request.build_absolute_uri(obj.image.url)
    return None