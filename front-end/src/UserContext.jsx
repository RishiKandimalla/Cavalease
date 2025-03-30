// src/UserContext.js
import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase-config"; // Ensure Firebase is correctly set up
import { onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";

// Create a context for the user
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Set up an auth state listener
  useEffect(() => {
    // Set persistence to local to maintain the login state
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            setUser(currentUser);
          } else {
            setUser(null);
          }
        });

        return () => unsubscribe(); // Cleanup the listener on unmount
      })
      .catch((error) => {
        console.error("Error setting persistence:", error);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
