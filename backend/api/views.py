from rest_framework.generics import ListCreateAPIView
from django_filters.rest_framework import DjangoFilterBackend
from .models import Listing
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

        return queryset
