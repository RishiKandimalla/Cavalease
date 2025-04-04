import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import Button from "./components/Button";
import { UserContext } from "./UserContext.jsx";
import MapComponent from "./components/MapComponent.jsx";
import API from "./api";


function Searchers() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext); // Get user from context
    const isLoggedIn = !!user;

    const goToLoginPage = () => navigate('/login');

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        genderPreference: "3",
        email: "",
        latitude: "",
        longitude: "",
        leaseStart: "",
        leaseEnd: "",
        maxRent: "",
        pets: false,
        parkingPass: false
    });

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("User signed out successfully");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("searcher_id", user.uid);
        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
        }
        try {
          const response = await API.post(
            "/api/searchers/",
            formDataToSend, 
            { headers: { "Content-Type": "multipart/form-data" } }
          );
      
          console.log("Preferences added successfully:", response.data);
          navigate("/preferences-saved");
        } catch (error) {
          console.error("Error adding preferences:", error.response ? error.response.data : error);
        }
    };

    return (
        <div className="min-h-screen bg-white">

           <div className="fixed top-0 left-0 w-full bg-primary-2 text-white py-4 px-8 flex justify-between items-center shadow-md z-50">
               <button onClick={() => navigate("/")} className="text-3xl font-bold bg-primary-2 tracking-wide cursor-pointer">
                 CAVALEASE
             </button>
             {isLoggedIn ? (
                    <div className="flex items-center gap-4">
                        <p>You are logged in</p>
                        <Button onClick={handleSignOut} className="bg-primary text-white">
                            Sign out
                        </Button>
                    </div>
                ) : (
                    <Button onClick={goToLoginPage} className="bg-primary text-primary-2">
                        Login
                    </Button>
                )}
               </div>

            {/* Moving Title */}
            <div className="flex flex-col items-center mt-24"> 
                <motion.h1 
                    className="text-6xl font-bold text-gray-800 text-center mb-6"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.3, ease: "easeOut" }}
                >
                    Searching for Sublet
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
                        <label className="block text-lg font-medium text-gray-700">Name </label>
                        <input 
                            name="name" 
                            type="text" 
                            placeholder="Enter your name" 
                            value={formData.name} 
                            onChange={handleInputChange} 
                            className="w-full bg-white p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700">Age </label>
                        <input 
                            name="age" 
                            type="number" 
                            placeholder="Enter your age" 
                            value={formData.age} 
                            onChange={handleInputChange} 
                            className="w-full bg-white p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700">Gender</label>
                        <select 
                            name="genderPreference" 
                            value={formData.genderPreference} 
                            onChange={handleInputChange} 
                            className="w-full p-3 bg-white mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="3">Other</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700">Email </label>
                        <input 
                            name="email" 
                            type="email" 
                            placeholder="Enter your email" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                            className="w-full p-3 mt-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Latitude </label>
                            <input 
                                name="latitude" 
                                type="text" 
                                placeholder="Enter latitude" 
                                value={formData.latitude} 
                                onChange={handleInputChange} 
                                className="w-full p-3 mt-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-medium text-gray-700">Longitude </label>
                            <input 
                                name="longitude" 
                                type="text" 
                                placeholder="Enter longitude" 
                                value={formData.longitude} 
                                onChange={handleInputChange} 
                                className="w-full p-3 mt-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="col-span-2 mt-4">
        <MapComponent latitude={formData.latitude} longitude={formData.longitude} />
      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-lg font-medium text-gray-700">Lease Start </label>
                            <input 
                                name="leaseStart" 
                                type="date" 
                                value={formData.leaseStart} 
                                onChange={handleInputChange} 
                                className="w-full p-3 mt-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required 
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-medium text-gray-700">Lease End </label>
                            <input 
                                name="leaseEnd" 
                                type="date" 
                                value={formData.leaseEnd} 
                                onChange={handleInputChange} 
                                className="w-full p-3 mt-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required 
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700">Max Rent </label>
                        <input 
                            name="maxRent" 
                            type="number" 
                            placeholder="Enter your max rent" 
                            value={formData.maxRent} 
                            onChange={handleInputChange} 
                            className="w-full p-3 mt-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required 
                        />
                    </div>

                    <div className="flex items-center">
                        <input 
                            type="checkbox" 
                            name="pets" 
                            checked={formData.pets} 
                            onChange={handleInputChange} 
                            className="mr-2"
                        />
                        <span className="text-lg">Pets Allowed</span>
                    </div>

                    <div className="flex items-center">
                        <input 
                            type="checkbox" 
                            name="parkingPass" 
                            checked={formData.parkingPass} 
                            onChange={handleInputChange} 
                            className="mr-2"
                        />
                        <span className="text-lg">Parking Pass</span>
                    </div>

                    <button 
                        type="submit" 
                        className="bg-primary text-white p-3 w-full rounded-2xl shadow-xl hover:bg-primary-2"
                    >
                        Submit
                    </button>
                </motion.form>
            </div>
        </div>
    );
}

export default Searchers;
