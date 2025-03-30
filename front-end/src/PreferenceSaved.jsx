// src.PreferenceSaved.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigating to another page
import Button from './components/Button'; // Assuming you have a Button component

function PreferenceSaved() {
  const navigate = useNavigate();

  // Navigate to the search page
  const goToListingsPage = () => {
    navigate('/listings'); // Adjust this to your desired search page route
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
          Your preferences have been saved.
        </p>
        <p className="text-lg text-center mb-6">
          Click below to view search results based on your preferences.
        </p>
        <div className="flex justify-center">
          <Button onClick={goToListingsPage}>View Search</Button> {/* Button to go to search page */}
        </div>
      </div>
    </div>
  );
}

export default PreferenceSaved;
