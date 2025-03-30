// src.MyListings.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './components/Button'; // Assuming you have a Button component
import axios from 'axios';
import API from './api';

function MyListings() {
  const navigate = useNavigate();

  // Placeholder data for listings
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);  // State for loading status
  const [error, setError] = useState(null);

  // Placeholder for searching or filtering the listings (optional)
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await API.get('/api/listings/');  // Adjust endpoint as needed
        setListings(response.data);  // Set the fetched listings to state
        setLoading(false);  // Set loading to false once the data is fetched
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError("Failed to load listings.");  // Set error state
        setLoading(false);  // Stop loading on error
      }
    };

    fetchListings();
  }, []);

  const [expandedListingId, setExpandedListingId] = useState(null);

  const toggleDetails = (id) => {
    if (expandedListingId === id) {
      setExpandedListingId(null); // Collapse if already expanded
    } else {
      setExpandedListingId(id); // Expand if not already expanded
    }
  };

    // Handle the loading state
  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-screen">
        <p>Loading listings...</p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="w-full flex justify-center items-center min-h-screen">
        <p>{error}</p>
      </div>
    );
  }

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
