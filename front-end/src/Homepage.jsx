// src/Homepage.jsx
import { useNavigate } from "react-router-dom";
import React from "react";

function Homepage() {
  const navigate = useNavigate();

  const goToSubletterPage = () => {
    navigate('/subletters');
  };

  const goToSearcherPage = () => {
    navigate('/searchers');
  };

  return (
    <div>
      <h1>Welcome to Cavalease!</h1>
      <h2>
        Put up your unit for sublease, or find available units.
      </h2>
      <p>What are you looking for?</p>
      <button onClick={goToSubletterPage}>Subletting my place</button>
      <button onClick={goToSearcherPage}>Searching for a place</button>
    </div>
  );
}

export default Homepage;