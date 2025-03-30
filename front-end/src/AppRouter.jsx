// AppRouter.jsx
import { Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import Homepage from './Homepage'; // Import Homepage component
import App from './App'; // Import App component
import Searchers from './Searchers'; // Import Searchers component
import Subletters from './Subletters'; // If you have this component
import PreferenceSaved from './PreferenceSaved.jsx';
import Listings from './Listings.jsx';
import { LoginButton, LoginForm } from "./Login";
import { auth } from "../firebase-config.js";  // Import Firebase Auth
import { onAuthStateChanged } from "firebase/auth";

function AppRouter() {
  const [user, setUser] = useState(null); // To track the logged-in user

  // Set up an observer to track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);  // If user is logged in, set user state
    });

    return () => unsubscribe();  // Clean up observer on unmount
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} /> {/* Homepage route */}
      <Route path="/searchers" element={<Searchers />} /> {/* Searchers route */}
      <Route path="/subletters" element={<Subletters />} /> {/* Subletters route */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/preferences-saved" element={<PreferenceSaved />} />
      <Route path="/listings" element={<Listings />} />
    </Routes>
  );
}

export default AppRouter;
