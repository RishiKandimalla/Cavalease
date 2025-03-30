import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";
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

  return (
    <div className="w-full flex justify-center">
      <div className="p-6 w-[80vw] my-12 border-4 border-primary-2 rounded-2xl shadow-xl flex flex-col mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-4">Search Listings</h1>

        {/* Filter Bar */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: "20px" }}>
          {/* Price Range Filter */}
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={10000}
            sx={{ width: 300 }}
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

          {/* Lease Start Date */}
          <TextField
            label="Lease Start"
            type="date"
            InputLabelProps={{ shrink: true }}
            sx={{ width: 300 }}
            value={leaseStart}
            onChange={(e) => setLeaseStart(e.target.value)}
          />

          {/* Lease End Date */}
          <TextField
            label="Lease End"
            type="date"
            InputLabelProps={{ shrink: true }}
            sx={{ width: 300 }}
            value={leaseEnd}
            onChange={(e) => setLeaseEnd(e.target.value)}
          />

          {/* Max Rent Filter */}
          <TextField
            label="Max Rent"
            type="number"
            sx={{ width: 300 }}
            value={maxRent}
            onChange={(e) => setMaxRent(Number(e.target.value))}
          />

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
              <img src={listing.image} alt="Listing" className="w-40 h-40 object-cover rounded-lg mr-6" />
              <div className="flex-1">
                <h2 className="text-xl font-bold">{listing.buildingName}</h2>
                <p className="text-md">{listing.address}</p>
                <p className="text-lg text-green-600">{`$${listing.monthlyRent}/month`}</p>
                <p className="text-md">{`${listing.numBedroomsAvailable} of ${listing.totalBedrooms} Bedrooms Available`}</p>
                <p className="text-md">{`Lease: ${listing.leaseStart} to ${listing.leaseEnd}`}</p>
                <p className="text-md">{`Posted on: ${listing.datePosted}`}</p>
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
