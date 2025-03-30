from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator



class Subletter(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(blank=True, null=True, max_length=254)
    phone_number = models.CharField(blank=True, null=True, max_length=15)

class Listing(models.Model):
    address = models.CharField(max_length=255)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    buildingName = models.CharField(max_length=255)
    image = models.ImageField(upload_to='unit_images/')
    leaseStart = models.DateField()
    leaseEnd = models.DateField()
    monthlyRent = models.IntegerField(validators=[MinValueValidator(1)]);
    isRentNegotiable = models.BooleanField(default=False)
    datePosted = models.DateField()
    numBedroomsAvailable = models.IntegerField(validators=[MinValueValidator(0)])
    totalBedrooms = models.IntegerField(validators=[MinValueValidator(0)])
    numBathrooms = models.IntegerField(validators=[MinValueValidator(0)])
    washerAndDryerAvailable = models.BooleanField()
    petsAllowed = models.BooleanField()
    furnished = models.BooleanField()
    parkingPass = models.BooleanField()
    otherPresentHousemates = models.BooleanField()
    available = models.BooleanField()
    genderPreference = models.IntegerField(choices=[(1,"Male"),(2,"Female"),(3, "Any")], default=3)
    minAge = models.IntegerField(default=0,validators=[MinValueValidator(1)])
    maxAge = models.IntegerField(default=100,validators=[MinValueValidator(1)])
    studentsOnly = models.BooleanField(default=False)
    numPeopleContacted = models.IntegerField(default=0)
    subletter = models.ForeignKey(Subletter, related_name="listings", on_delete=models.CASCADE)  # One subletter per listing


class Searcher(models.Model):
    name = models.CharField(max_length=255)
    age = models.IntegerField(validators=[MinValueValidator(1)]);
    gender = models.IntegerField(choices=[(1,"Male"),(2,"Female")], default=3)
    email = models.EmailField(blank=True, null=True, max_length=254)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    leaseStart = models.DateField()
    leaseEnd = models.DateField()
    maxRent = models.IntegerField(validators=[MinValueValidator(1)]);
    pets = models.BooleanField(default=False)
    parkingPass = models.BooleanField(default=False)
    
class SearcherSavedListings(models.Model):
    # Many-to-many relationship for saved listings
    searcher = models.ForeignKey(Searcher, on_delete=models.CASCADE, related_name="saved_listings")
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name="saved_by_searchers")

    saved_at = models.DateTimeField(auto_now_add=True)