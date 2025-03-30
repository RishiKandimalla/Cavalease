from .views import ListingListCreateView, ListingUpdateView, ListingDeleteView
from django.urls import path


urlpatterns = [
    path('listings/', ListingListCreateView.as_view(), name='listing-list-create'),
    path('listings/<int:pk>/', ListingUpdateView.as_view(), name='listing-update'),
    path('listings/<int:pk>/delete/', ListingDeleteView.as_view(), name='listing-delete'),

]
