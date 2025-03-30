from rest_framework.generics import ListCreateAPIView
from django_filters.rest_framework import DjangoFilterBackend
from .models import Listing, SearcherSavedListings
from .serializers import ListingSerializer
from .filters import ListingFilter

class ListingListCreateView(ListCreateAPIView):
    serializer_class = ListingSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ListingFilter

    def get_queryset(self):
        queryset = Listing.objects.all()
        
        # Ensure 'available' is True by default unless explicitly filtered
        if "available" not in self.request.GET:
            queryset = queryset.filter(available=True)
            
        searcher_id = self.request.query_params.get('saved_by_searcher', None)
        if searcher_id:
            # Filter listings that have been saved by a specific searcher
            queryset = queryset.filter(saved_by_searchers__searcher_id=searcher_id)

        return queryset
