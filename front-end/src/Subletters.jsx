import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Button from "./components/Button";
import { motion } from "framer-motion";

function Subletters() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: '',
    latitude: '',
    longitude: '',
    buildingName: '',
    image: null,
    leaseStart: '',
    leaseEnd: '',
    monthlyRent: '',
    isRentNegotiable: false,
    datePosted: '',
    numBedroomsAvailable: '',
    totalBedrooms: '',
    numBathrooms: '',
    washerAndDryerAvailable: false,
    petsAllowed: false,
    furnished: false,
    parkingPass: false,
    otherPresentHousemates: false,
    available: false,
    genderPreference: '3',
    minAge: '',
    maxAge: '',
    studentsOnly: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    navigate('/preferences-saved');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <div className="fixed top-0 left-0 w-full bg-primary-2 text-white py-4 px-8 flex justify-between items-center shadow-md z-50">
        <button onClick={() => navigate("/")} className="text-3xl font-bold bg-primary-2 tracking-wide cursor-pointer">
          CAVALEASE
        </button>
        <Button onClick={() => navigate('/login')} className="bg-primary text-primary-2 ">
          Login
        </Button>
      </div>

      {/* Moving Title */}
      <div className="flex flex-col items-center mt-24">
        <motion.h1 
          className="text-6xl font-bold text-gray-800 text-center mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
        >
          Subletting
        </motion.h1>

        {/* Animated Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full space-y-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div>
            <label className="block text-lg font-medium text-gray-700">Address</label>
            <input
              name="address"
              type="text"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Building Name</label>
            <input
              name="buildingName"
              type="text"
              placeholder="Enter building name"
              value={formData.buildingName}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-medium text-gray-700">Latitude</label>
              <input
                name="latitude"
                type="text"
                placeholder="Enter latitude"
                value={formData.latitude}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">Longitude</label>
              <input
                name="longitude"
                type="text"
                placeholder="Enter longitude"
                value={formData.longitude}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-medium text-gray-700">Lease Start</label>
              <input
                name="leaseStart"
                type="date"
                value={formData.leaseStart}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">Lease End</label>
              <input
                name="leaseEnd"
                type="date"
                value={formData.leaseEnd}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Monthly Rent</label>
            <input
              name="monthlyRent"
              type="number"
              placeholder="Enter monthly rent"
              value={formData.monthlyRent}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isRentNegotiable"
              checked={formData.isRentNegotiable}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-lg">Is Rent Negotiable</span>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Date Posted</label>
            <input
              name="datePosted"
              type="date"
              value={formData.datePosted}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Number of Bedrooms Available</label>
            <input
              name="numBedroomsAvailable"
              type="number"
              placeholder="Enter available bedrooms"
              value={formData.numBedroomsAvailable}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Total Number of Bedrooms</label>
            <input
              name="totalBedrooms"
              type="number"
              placeholder="Enter total bedrooms"
              value={formData.totalBedrooms}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Number of Bathrooms</label>
            <input
              name="numBathrooms"
              type="number"
              placeholder="Enter number of bathrooms"
              value={formData.numBathrooms}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="washerAndDryerAvailable"
              checked={formData.washerAndDryerAvailable}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-lg">Washer and Dryer Available</span>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="petsAllowed"
              checked={formData.petsAllowed}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-lg">Pets Allowed</span>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="furnished"
              checked={formData.furnished}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-lg">Furnished</span>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="parkingPass"
              checked={formData.parkingPass}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-lg">Parking Pass</span>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="otherPresentHousemates"
              checked={formData.otherPresentHousemates}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-lg">Other Present Housemates</span>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-lg">Available</span>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Gender Preference</label>
            <select
              name="genderPreference"
              value={formData.genderPreference}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="3">No Preference</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-medium text-gray-700">Min Age</label>
              <input
                name="minAge"
                type="number"
                placeholder="Enter min age"
                value={formData.minAge}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">Max Age</label>
              <input
                name="maxAge"
                type="number"
                placeholder="Enter max age"
                value={formData.maxAge}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="studentsOnly"
              checked={formData.studentsOnly}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-lg">Students Only</span>
          </div>

          <button
            type="submit"
            className="bg-primary text-white p-3 w-full rounded-2xl shadow-xl hover:bg-primary-2"
          >
            Submit Listing
          </button>
        </motion.form>
      </div>
    </div>
  );
}

export default Subletters;
