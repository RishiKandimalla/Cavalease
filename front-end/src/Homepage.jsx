// src/Homepage.jsx
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Button from "./components/Button";
import { motion } from "framer-motion";
import {LoginButton, LoginForm} from "./Login";
import { auth } from "../firebase-config"; // Ensure this import is correct
import { signOut, onAuthStateChanged } from "firebase/auth"; 

function Homepage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);  // Set the user if logged in
      } else {
        setUser(null);  // Set user to null if not logged in
      }
    });

    return () => unsubscribe(); // Clean up the listener when component unmounts
  }, []);
  

  const goToSubletterPage = () => {
    navigate('/subletters');
  };

  const goToSearcherPage = () => {
    navigate('/searchers');
  };

  const handleNavigation = (path) => {
    if (user) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };
  

  const goToLoginPage = () => {
    navigate("/login"); // Navigate to login page when button is clicked
  };
  
  const handleSignOut = () => {
    signOut(auth)  // Sign out the user using Firebase's signOut method
      .then(() => {
        console.log("User signed out");
        setUser(null);  // Clear the user state after sign out
      })
      .catch((error) => {
        console.error("Error signing out: ", error.message);
      });
  };

  return (
    
    <div className="min-h-screen flex flex-col items-center bg-white">

      {/* Banner */}
      <div className="fixed top-0 left-0 w-full bg-primary-2 text-white py-4 px-8 flex justify-between items-center shadow-md z-50">
        <h1 className="text-3xl font-bold tracking-wide">CAVALEASE</h1>
        <div>
        {user ? (
          <>
            <p>You are logged in</p> 
            <Button onClick={handleSignOut}>Sign out</Button> {}
          </>
        ) : (
        <Button onClick={goToLoginPage}>Login</Button> // Show login button if not logged in
      )}

      
       </div>
      </div>


      <div className="mt-40 w-full text-center"> 
      <motion.h1 
        className="text-7xl font-semibold text-center mb-4"
        initial={{ opacity: 0, y: -50 }} // Starts faded and moved up
        animate={{ opacity: 1, y: 0 }}   // Moves down and fades in
        transition={{ duration: 1.3, ease: "easeOut" }} // Smooth effect
      >
        Welcome to Cavalease!
      </motion.h1>
      <br></br>
      <h2 className="text-2xl font-medium text-center mb-4">
        Put up your unit for sublease, or find available units.
      </h2>
      <motion.div 
        className="p-6 max-w-3xl mx-auto my-12 border-4 border-primary-2 rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 50 }}  // Starts invisible and slightly smaller
        animate={{ opacity: 1, y:0}}   // Fades in and grows to normal size
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <p className="text-2xl font-semibold text-center mb-4">
          What are you looking for?
        </p>
        <div className="flex justify-center gap-10">
        <Button onClick={() => handleNavigation('/subletters')}>
              Subletting my place
            </Button>
            <Button onClick={() => handleNavigation('/searchers')}>
              Searching for a place
            </Button>
        </div>
      </motion.div>
      <motion.div
          className="p-6 max-w-3xl mx-auto my-12 border-4 border-primary-2 rounded-2xl shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <p className="text-xl font-semibold text-center mb-4">
            Manage or search for listings
          </p>
          <div className="flex justify-center gap-10">
            <Button onClick={() => handleNavigation("/my-listings")}>
              My Listings
            </Button>
            <Button onClick={() => handleNavigation("/listings")}>
              Search Listings
            </Button>
          </div>
        </motion.div>
    </div>
    </div>
  );
}

export default Homepage;