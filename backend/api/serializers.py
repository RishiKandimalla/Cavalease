from rest_framework import serializers
from .models import Listing, Searcher

class SearcherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Searcher
        fields = '__all__'
        
        
#class SubletterSerializer(serializers.ModelSerializer):
#    class Meta:
#        model = Subletter
#        fields = ['id', 'name', 'email', 'phone_number']
        
class ListingSerializer(serializers.ModelSerializer):
    #subletter = serializers.PrimaryKeyRelatedField(queryset=Subletter.objects.all())  # Expecting subletter ID
    class Meta:
        model = Listing
        fields = '__all__'