// src/Homepage.jsx
import { useNavigate } from "react-router-dom";
import React from "react";
import Button from "./components/Button";
import { motion } from "framer-motion";
// import LoginButton from "./Login";

function Homepage() {
  const navigate = useNavigate();

  const goToSubletterPage = () => {
    navigate('/subletters');
  };

  const goToSearcherPage = () => {
    navigate('/searchers');
  };

  return (
    
    <div className="min-h-screen flex flex-col items-center bg-white">

      {/* Banner */}
      <div className="fixed top-0 left-0 w-full bg-primary-2 text-white py-4 px-8 flex justify-between items-center shadow-md z-50">
        <h1 className="text-3xl font-bold tracking-wide">CAVALEASE</h1>
        <div>
      {/* <h1>Firebase Login Example</h1>
      <LoginButton /> */}
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
          <Button onClick={goToSubletterPage}>Subletting my place</Button>
          <Button onClick={goToSearcherPage}>Searching for a place</Button>
        </div>
      </motion.div>
    </div>
    </div>
  );
}

export default Homepage;