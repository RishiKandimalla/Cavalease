import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase-config"; // Ensure Firebase is correctly set up
import { onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";

// Create a context for the user
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set up an auth state listener
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence); // Ensure login persists

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false); // Ensure loading state updates
        });

        return unsubscribe; // Cleanup function to remove listener
      } catch (error) {
        console.error("Error setting persistence:", error);
        setLoading(false); // Ensure app doesn't stay in loading state forever
      }
    };

    initializeAuth();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};
