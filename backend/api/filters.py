from django_filters import rest_framework as filters
from .models import Listing
from django.db.models import Q



class ListingFilter(filters.FilterSet):
    lease_start = filters.DateFilter(field_name="leaseStart", lookup_expr='lte', required=False)  
    lease_end = filters.DateFilter(field_name="leaseEnd", lookup_expr='gte', required=False)
    bedrooms = filters.NumberFilter(field_name="numBedroomsAvailable", lookup_expr='gte', required=False)
    washer_dryer = filters.BooleanFilter(field_name="washerAndDryerAvailable", method="filterIfTrue", required=False)
    furnished = filters.BooleanFilter(field_name="furnished", method="filterIfTrue", required=False)
    gender = filters.ChoiceFilter(
        field_name="genderPreference",
        choices=[(1, "Male"), (2, "Female"), (3, "Any")],
        required=False,
        method="filter_gender_preference",
    )
    min_age = filters.NumberFilter(field_name="minAge", lookup_expr='gte', required=False)
    max_age = filters.NumberFilter(field_name="maxAge", lookup_expr='lte', required=False)
    student = filters.BooleanFilter(field_name="studentsOnly", method="filterIfTrue", required=False)
    subletter_id = filters.CharFilter(field_name="subletter_id", required=False)
    max_rent = filters.NumberFilter(field_name="monthlyRent", lookup_expr='lte', required=False)
    pets = filters.BooleanFilter(field_name="petsAllowed", required=False, method="filterIfTrue")
    parking = filters.BooleanFilter(field_name="parkingPass", required=False, method="filterIfTrue")
    available = filters.BooleanFilter(field_name="available", required=False)
    
    def filterIfTrue(self, queryset, name, value):
        if value is False:
            return queryset  # No filter applied, return all results
        return queryset.filter(**{name: value})

    def filter_gender_preference(self, queryset, name, value):
        if value in ["1", 1]:  # If Male (1) is selected, include Any (3)
            return queryset.filter(Q(genderPreference=1) | Q(genderPreference=3))
        elif value in ["2", 2]:  # If Female (2) is selected, include Any (3)
            return queryset.filter(Q(genderPreference=2) | Q(genderPreference=3))
        return queryset  # If Any (3) or not provided, return all listings

    class Meta:
        model = Listing
        fields = [
            "lease_start",
            "lease_end",
            "bedrooms",
            "washer_dryer",
            "furnished",
            "gender",
            "min_age",
            "max_age",
            "student",
            "subletter_id",
            "max_rent",
            "pets",
            "parking",
            "available",
    ]