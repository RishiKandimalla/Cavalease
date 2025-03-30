from .views import ListingListCreateView
from django.urls import path


urlpatterns = [
    path('listings/', ListingListCreateView.as_view(), name='listing-list-create'),
]
