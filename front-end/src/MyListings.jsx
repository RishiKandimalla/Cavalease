// src.MyListings.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './components/Button'; // Assuming you have a Button component

function MyListings() {
  const navigate = useNavigate();

  // Placeholder data for listings
  const [listings, setListings] = useState([
    {
      id: 1,
      address: '123 Main St, Downtown',
      latitude: '38.0293',
      longitude: '-78.4767',
      buildingName: 'Downtown Apartments',
      image: 'https://via.placeholder.com/150',
      leaseStart: '2025-06-01',
      leaseEnd: '2026-06-01',
      monthlyRent: 1200,
      isRentNegotiable: false,
      datePosted: '2025-03-01',
      numBedroomsAvailable: 2,
      totalBedrooms: 4,
      numBathrooms: 2,
      washerAndDryerAvailable: true,
      petsAllowed: false,
      furnished: true,
      parkingPass: true,
      otherPresentHousemates: false,
      available: true,
      genderPreference: 3, // Any gender preference
      minAge: 18,
      maxAge: 30,
      studentsOnly: true,
      numPeopleContacted: 5,
    },
    {
      id: 2,
      address: '456 College Ave, UVA Area',
      latitude: '38.0301',
      longitude: '-78.5077',
      buildingName: 'UVA Apartments',
      image: 'https://via.placeholder.com/150',
      leaseStart: '2025-08-01',
      leaseEnd: '2026-08-01',
      monthlyRent: 900,
      isRentNegotiable: true,
      datePosted: '2025-03-10',
      numBedroomsAvailable: 1,
      totalBedrooms: 3,
      numBathrooms: 1,
      washerAndDryerAvailable: true,
      petsAllowed: true,
      furnished: false,
      parkingPass: false,
      otherPresentHousemates: true,
      available: true,
      genderPreference: 2, // Female preference
      minAge: 18,
      maxAge: 25,
      studentsOnly: true,
      numPeopleContacted: 3,
    },
    // More listings can be added here
  ]);

  // Placeholder for searching or filtering the listings (optional)
  useEffect(() => {
    // Here you would make an API call or filter listings based on search preferences
    console.log('Listings data is available.');
  }, [listings]);

  const [expandedListingId, setExpandedListingId] = useState(null);

  const toggleDetails = (id) => {
    if (expandedListingId === id) {
      setExpandedListingId(null); // Collapse if already expanded
    } else {
      setExpandedListingId(id); // Expand if not already expanded
    }
  };

  return (
<div className="w-full flex justify-center">

      <div className="fixed top-0 left-0 w-screen bg-primary-2 text-white py-4 px-8 flex justify-between items-center shadow-md z-50">
        <button onClick={() => navigate("/")} className="text-3xl font-bold bg-primary-2 tracking-wide cursor-pointer">
          CAVALEASE
        </button>
        <Button onClick={() => navigate('/login')} className="bg-primary text-primary-2">
          Login
        </Button>
      </div>
    
      <div className="p-6 w-[80vw] my-12 border-4 border-primary-2 rounded-2xl shadow-xl flex flex-col mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-4">My listings</h1>
        <p className="text-lg text-center mb-6">Here are the current listings you have posted.</p>

        {/* Placeholder listings */}
        <div className="space-y-6 w-full">
          {listings.map((listing) => (
             <div key={listing.id} className="border-2 border-primary-2 p-4 rounded-lg shadow-md flex w-full">
             {/* Image Section */}
             <img src={listing.image} alt="Listing" className="w-40 h-40 object-cover rounded-lg mr-6" />

             {/* Details Section */}
             <div className="flex-1">
               <h2 className="text-xl font-bold">{listing.buildingName}</h2>
               <p className="text-md">{listing.address}</p>
               <p className="text-lg text-green-600">{`$${listing.monthlyRent}/month`}</p>
               <p className="text-md">{`${listing.numBedroomsAvailable} of ${listing.totalBedrooms} Bedrooms Available`}</p>
               <p className="text-md">{`Lease: ${listing.leaseStart} to ${listing.leaseEnd}`}</p>
               <p className="text-md">{`Posted on: ${listing.datePosted}`}</p>

               {/* More Details Button */}
               <Button onClick={() => toggleDetails(listing.id)} className="mt-4">
                 {expandedListingId === listing.id ? 'Show Less' : 'More Details'}
               </Button>

               {/* Expanded Details */}
               {expandedListingId === listing.id && (
                 <div className="mt-4 space-y-2">
                   <p><strong>Latitude:</strong> {listing.latitude}</p>
                   <p><strong>Longitude:</strong> {listing.longitude}</p>
                   <p><strong>Washer & Dryer Available:</strong> {listing.washerAndDryerAvailable ? 'Yes' : 'No'}</p>
                   <p><strong>Pets Allowed:</strong> {listing.petsAllowed ? 'Yes' : 'No'}</p>
                   <p><strong>Furnished:</strong> {listing.furnished ? 'Yes' : 'No'}</p>
                   <p><strong>Parking Pass:</strong> {listing.parkingPass ? 'Yes' : 'No'}</p>
                   <p><strong>Gender Preference:</strong> {listing.genderPreference === 1 ? 'Male' : listing.genderPreference === 2 ? 'Female' : 'Any'}</p>
                   <p><strong>Min Age:</strong> {listing.minAge}</p>
                   <p><strong>Max Age:</strong> {listing.maxAge}</p>
                   <p><strong>Students Only:</strong> {listing.studentsOnly ? 'Yes' : 'No'}</p>
                   <p><strong>Other Housemates:</strong> {listing.otherPresentHousemates ? 'Yes' : 'No'}</p>
                 </div>
               )}
             </div>
            </div>
          ))}
        </div>

        {/* Placeholder button to go back or do something else */}
        <div className="flex justify-center mt-8">
          <Button onClick={() => navigate('/')}>Go Back to Homepage</Button>
        </div>
      </div>
    </div>
  );
}

export default MyListings;
