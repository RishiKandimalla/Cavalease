// src.Subletters.jsx
import { useNavigate } from "react-router-dom";
import React from "react";
import Button from "./components/Button";
import { motion } from "framer-motion";

function Subletters() {

    const navigate = useNavigate();  
    
  return (
    <div className="min-h-screen flex flex-col items-center bg-white">

      {/* Banner */}
      <div className="fixed top-0 left-0 w-full bg-primary-2 text-white py-4 px-8 flex justify-between items-center shadow-md z-50">
      <button onClick={() => navigate("/")} className="text-3xl font-bold bg-primary-2 tracking-wide cursor-pointer">
        CAVALEASE
    </button>
        <Button onClick={() => navigate('/login')} className="bg-white text-primary-2 font-bold">
          Login
        </Button>
      </div>


      <div className="mt-40 w-full text-center">
      <motion.h1 
        className="text-7xl font-semibold text-center mb-4"
        initial={{ opacity: 0, y: -50 }} // Starts faded and moved up
        animate={{ opacity: 1, y: 0 }}   // Moves down and fades in
        transition={{ duration: 1.3, ease: "easeOut" }} // Smooth effect
      >
        Subletting
      </motion.h1>
      <br></br>
    </div>
    </div>
  );
}

export default Subletters;
