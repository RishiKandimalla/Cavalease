  import React, { useState, useEffect, useContext } from "react";
  import { useNavigate } from "react-router-dom";
  import API from "./api";
  import Button from './components/Button'; // Assuming you have a Button component
  import { UserContext } from './UserContext.jsx';

  import {
    Slider,
    Box,
    TextField,
    Button as MUIButton,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Checkbox,
    FormControlLabel
  } from "@mui/material";

  function Listings() {
    const { user , loading1} = useContext(UserContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [listings, setListings] = useState([]);
    const [filteredListings, setFilteredListings] = useState([]);

    // Filters state
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [bedrooms, setBedrooms] = useState("");
    const [leaseStart, setLeaseStart] = useState("");
    const [leaseEnd, setLeaseEnd] = useState("");
    const [maxRent, setMaxRent] = useState(10000);
    const [petsAllowed, setPetsAllowed] = useState(false);
    const [parkingPass, setParkingPass] = useState(false);
    const [age, setMinAge] = useState(""); // Min age filter
    //const [maxAge, setMaxAge] = useState(""); // Max age filter
    const [gender, setGender] = useState(""); // Gender filter
    const [expandedListingId, setExpandedListingId] = useState(null); // Make sure this is top level

    // Fetch listings
    useEffect(() => {
      const fetchListings = async () => {
        try {
          const response = await API.get("/api/listings/");
          setListings(response.data);
          setFilteredListings(response.data);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching listings:", err);
          setError("Failed to load listings.");
          setLoading(false);
        }
      };

      fetchListings();
    }, []);

    // Filter listings based on the searcher’s input
    const handleFilterChange = () => {
      let filtered = listings;
    
      filtered = filtered.filter(
        (listing) =>
          listing.monthlyRent >= priceRange[0] && listing.monthlyRent <= priceRange[1]
      );
    
      if (bedrooms) {
        filtered = filtered.filter(
          (listing) => listing.numBedroomsAvailable >= bedrooms
        );
      }
    
      if (leaseStart) {
        filtered = filtered.filter(
          (listing) => new Date(listing.leaseStart) >= new Date(leaseStart)
        );
      }
    
      if (leaseEnd) {
        filtered = filtered.filter(
          (listing) => new Date(listing.leaseEnd) <= new Date(leaseEnd)
        );
      }
    
      if (maxRent) {
        filtered = filtered.filter(
          (listing) => listing.monthlyRent <= maxRent
        );
      }
    
      if (petsAllowed) {
        filtered = filtered.filter((listing) => listing.petsAllowed === true);
      }
    
      if (parkingPass) {
        filtered = filtered.filter((listing) => listing.parkingPass === true);
      }
    
      if (age) {
        filtered = filtered.filter((listing) => (listing.minAge <= age && listing.maxAge >= age));
      }
    
      if (gender) {
        filtered = filtered.filter((listing) => listing.genderPreference === gender);
      }
    
      // ✅ Sort listings by newest (datePosted in descending order)
      filtered = filtered.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
    
      setFilteredListings(filtered);
    };
    

    const handleSearch = () => {
      handleFilterChange();
    };

    if (loading) {
      return <p>Loading listings...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    const toggleDetails = (id) => {
      setExpandedListingId((prev) => (prev === id ? null : id)); // Ensure toggle is unconditional
    };

    return (
      <div className="w-full flex justify-center">
        <div className="p-6 w-[80vw] my-12 border-4 border-primary-2 rounded-2xl shadow-xl flex flex-col mx-auto">
          <h1 className="text-3xl font-semibold text-center mb-4">Search Listings</h1>

          {/* Filter Bar */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: "20px" }}>
            {/* Price Range Filter */}
      { /*    <Slider
              value={priceRange}
              onChange={(e, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={10000}
              sx={{ width: 300 }}
            />*/}



            {/* Lease Start Date */}
            <Box sx={{ display: "flex", gap: 2 }}>
    <TextField
      label="Lease Start"
      type="date"
      InputLabelProps={{ shrink: true }}
      sx={{ width: 300 }}
      value={leaseStart}
      onChange={(e) => setLeaseStart(e.target.value)}
    />

    <TextField
      label="Lease End"
      type="date"
      InputLabelProps={{ shrink: true }}
      sx={{ width: 300 }}
      value={leaseEnd}
      onChange={(e) => setLeaseEnd(e.target.value)}
    />
  </Box>
  <Box sx={{ display: "flex", gap: 2 }}>

            {/* Max Rent Filter */}
            <TextField
              label="Max Rent"
              type="number"
              sx={{ width: 300 }}
              value={maxRent}
              onChange={(e) => setMaxRent(Number(e.target.value))}
            />
                      {/* Bedrooms Filter */}
                      <FormControl sx={{ width: 300 }}>
              <InputLabel>Bedrooms</InputLabel>
              <Select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                label="Bedrooms"
              >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value={1}>1 Bedroom</MenuItem>
                <MenuItem value={2}>2 Bedrooms</MenuItem>
                <MenuItem value={3}>3 Bedrooms</MenuItem>
                <MenuItem value={4}>4+ Bedrooms</MenuItem>
              </Select>
            </FormControl>
            </Box>

            {/* Age Range Filters */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Age"
                type="number"
                sx={{ width: 140 }}
                value={age}
                onChange={(e) => setMinAge(Number(e.target.value))}
              />
              {/*
              <TextField
                label="Max Age"
                type="number"
                sx={{ width: 140 }}
                value={maxAge}
                onChange={(e) => setMaxAge(Number(e.target.value))}
              />*/}

                        {/* Gender Filter */}
            <FormControl sx={{ width: 300 }}>
              <InputLabel>Gender</InputLabel>
              <Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                label="Gender"
              >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value={1}>Male</MenuItem>
                <MenuItem value={2}>Female</MenuItem>
              </Select>
            </FormControl>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>


            {/* Pets Allowed */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={petsAllowed}
                  onChange={(e) => setPetsAllowed(e.target.checked)}
                />
              }
              label="Pets Allowed"
            />

            {/* Parking Pass */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={parkingPass}
                  onChange={(e) => setParkingPass(e.target.checked)}
                />
              }
              label="Parking Pass"
            />
                      </Box>


            {/* Search Button */}
            <MUIButton
              variant="contained"
              onClick={handleSearch}
              sx={{ width: 300, backgroundColor: "#0073e6", color: "#fff" }}
            >
              Search
            </MUIButton>
          </Box>

          {/* Listings */}
          <div className="space-y-6 w-full">
            {filteredListings.map((listing) => (
              <div key={listing.id} className="border-2 border-primary-2 p-4 rounded-lg shadow-md flex w-full">
                {/* Image Section */}
                <img src={listing.image} alt="Listing" className="w-40 h-40 object-cover rounded-lg mr-6" />

                {/* Details Section */}
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{listing.buildingName}</h2>
                  <p className="text-md">{listing.address}</p>
                  <p className="text-lg text-green-600">{`$${listing.monthlyRent}/month`}</p>
                  <p className="text-md">{`${listing.numBedroomsAvailable} of ${listing.totalBedrooms} Bedrooms Available`}</p>
                  <p className="text-md">{`Lease: ${listing.leaseStart} to ${listing.leaseEnd}`}</p>
                  <p className="text-md">{`Posted on: ${listing.datePosted}`}</p>

                  {/* More Details Button */}
                  <Button
                    onClick={() => toggleDetails(listing.id)}
                    className="mt-4 w-64 h-8 px-4 py-1 text-sm"
                  >
                    {expandedListingId === listing.id ? 'Show Less' : 'More Details'}
                  </Button>

                  {/* Expanded Details */}
                  {expandedListingId === listing.id && (
                    <div className="mt-4 space-y-2">
                      <p><strong>Latitude:</strong> {listing.latitude}</p>
                      <p><strong>Longitude:</strong> {listing.longitude}</p>
                      <p><strong>Washer & Dryer Available:</strong> {listing.washerAndDryerAvailable ? 'Yes' : 'No'}</p>
                      <p><strong>Pets Allowed:</strong> {listing.petsAllowed ? 'Yes' : 'No'}</p>
                      <p><strong>Furnished:</strong> {listing.furnished ? 'Yes' : 'No'}</p>
                      <p><strong>Parking Pass:</strong> {listing.parkingPass ? 'Yes' : 'No'}</p>
                      <p><strong>Gender Preference:</strong> {listing.genderPreference === 1 ? 'Male' : listing.genderPreference === 2 ? 'Female' : 'Any'}</p>
                      <p><strong>Min Age:</strong> {listing.minAge}</p>
                      <p><strong>Max Age:</strong> {listing.maxAge}</p>
                      <p><strong>Students Only:</strong> {listing.studentsOnly ? 'Yes' : 'No'}</p>
                      <p><strong>Other Housemates:</strong> {listing.otherPresentHousemates ? 'Yes' : 'No'}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <MUIButton variant="contained" onClick={() => navigate("/")}>
              Go Back to Homepage
            </MUIButton>
          </div>
        </div>
      </div>
    );
  }

  export default Listings;
