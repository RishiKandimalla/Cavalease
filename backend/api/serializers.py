from rest_framework import serializers
from .models import Listing, Searcher

class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = '__all__'

class SearcherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Searcher
        fields = '__all__'