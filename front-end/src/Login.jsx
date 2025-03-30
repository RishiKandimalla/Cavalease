// src/Login.jsx
import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase-config";

function LoginButton() {
  const [error, setError] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
      setError("Error signing in. Please try again.");
    }
  };

  return (
    <div>
      <button onClick={handleGoogleLogin} className="bg-blue-500 text-white p-3 rounded-md">
        Sign in with Google
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default LoginButton;
