// src/Login.jsx
import React, { useState, useContext } from "react";
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext.jsx"; 
import { motion } from "framer-motion";

export function LoginButton() {
const { user } = useContext(UserContext);
const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
      navigate("/");
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

export function LoginForm() {
const { user } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up successfully!");
      navigate("/");
      
    } catch (err) {
      console.error("Signup Error:", err.message);
      setError(err.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully!");
      navigate("/"); 
    } catch (err) {
      console.error("Login Error:", err.message);
      setError(err.message);
    }
  };

//   if (user) {
//     return <p>Welcome!</p>; // If the user is logged in, show their name
//   }

  return (
    <div className="flex flex-col gap-4">
          <motion.h1 
                    className="text-6xl font-bold text-gray-800 text-center mb-6"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.3, ease: "easeOut" }}
                >
                  Log in or Create an Account 
                </motion.h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded bg-white"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded bg-white"
      />
      <button onClick={handleSignup} className="bg-primary-2 text-white p-2 rounded">Sign Up</button>
      <button onClick={handleLogin} className="bg-primary text-white p-2 rounded">Login</button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
