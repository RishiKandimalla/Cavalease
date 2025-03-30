// src.ListingAdded.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigating to another page
import Button from './components/Button'; // Assuming you have a Button component

function ListingAdded() {
  const navigate = useNavigate();

  // Navigate to the search page
  const goToMyListingsPage = () => {
    navigate('/my-listings'); // Adjust this to your desired search page route
  };

  return (

    
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">

        <div className="fixed top-0 left-0 w-full bg-primary-2 text-white py-4 px-8 flex justify-between items-center shadow-md z-50">
                       <button onClick={() => navigate("/")} className="text-3xl font-bold bg-primary-2 tracking-wide cursor-pointer">
                         CAVALEASE
                     </button>
                         <Button onClick={() => navigate('/login')} className="bg-primary text-primary-2">
                           Login
                         </Button>
                       </div>
      <div className="p-6 max-w-3xl mx-auto my-12 border-4 border-primary-2 rounded-2xl shadow-xl">
        <p className="text-2xl font-semibold text-center mb-4">
          Your listing has been posted!
        </p>
        <p className="text-lg text-center mb-6">
          Click below to view all of your listings. 
        </p>
        <div className="flex justify-center">
          <Button onClick={goToMyListingsPage}>View My Listings</Button> {}
        </div>
      </div>
    </div>
  );
}

export default ListingAdded;
