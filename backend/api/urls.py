from .views import ListingListCreateView, ListingUpdateView, ListingDeleteView, SearcherListCreateView, SearcherRetrieveView, SearcherUpdateView
from django.urls import path


urlpatterns = [
    path('listings/', ListingListCreateView.as_view(), name='listing-list-create'),
    path('listings/<int:pk>/', ListingUpdateView.as_view(), name='listing-update'),
    path('listings/<int:pk>/delete/', ListingDeleteView.as_view(), name='listing-delete'),
    #path('subletters/', SubletterListCreateView.as_view(), name='subletter-list-create'),
    #path('subletters/<int:id>/', SubletterRetrieveView.as_view(), name='subletter-retrieve'),
    path('searchers/', SearcherListCreateView.as_view(), name='searcher-list-create'),
    path('searchers/<int:id>/', SearcherRetrieveView.as_view(), name='searcher-retrieve'),
    path('searchers/<int:id>/update/', SearcherUpdateView.as_view(),name = 'searcher-update' )
]
