# basic_api/views.py
from django.db.models import Q
from rest_framework import generics, parsers
from basic_api.models import DRFPost
from basic_api.serializers import DRFPostSerializer

class API_objects(generics.ListCreateAPIView):
    queryset = DRFPost.objects.all().order_by('-uploaded') 
    serializer_class = DRFPostSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser, parsers.JSONParser]

    def get_queryset(self):
        qs = super().get_queryset()
        q = self.request.query_params.get('q', None)
        rating = self.request.query_params.get('rating', None)

        if q:
            qs = qs.filter(Q(name__icontains=q) | Q(author__icontains=q))

        if rating:
            qs = qs.filter(rating=rating)

        return qs


class API_objects_details(generics.RetrieveUpdateDestroyAPIView):
    queryset = DRFPost.objects.all()
    serializer_class = DRFPostSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser, parsers.JSONParser]
