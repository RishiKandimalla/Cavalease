from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView, DestroyAPIView,RetrieveAPIView
from django_filters.rest_framework import DjangoFilterBackend
from .models import Listing, SearcherSavedListings, Subletter, Searcher
from .serializers import ListingSerializer, SubletterSerializer, SearcherSerializer
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

class ListingUpdateView(RetrieveUpdateAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    
class ListingDeleteView(DestroyAPIView):
    queryset = Listing.objects.all()  # The set of objects that can be deleted
    serializer_class = ListingSerializer
    
class SubletterListCreateView(ListCreateAPIView):
    queryset = Subletter.objects.all()
    serializer_class = SubletterSerializer

class SubletterRetrieveView(RetrieveAPIView):
    queryset = Subletter.objects.all()
    serializer_class = SubletterSerializer
    lookup_field = 'id'
    
class SearcherListCreateView(ListCreateAPIView):
    queryset = Searcher.objects.all()
    serializer_class = SearcherSerializer

class SearcherRetrieveView(RetrieveAPIView):
    queryset = Searcher.objects.all()
    serializer_class = SearcherSerializer
    lookup_field = 'id'
    
class SearcherUpdateView(RetrieveAPIView):
    queryset=Searcher.objects.all()
    serializer_class = SearcherSerializer