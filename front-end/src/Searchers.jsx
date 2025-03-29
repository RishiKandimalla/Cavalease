// src.Searchers.jsx
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function Searchers() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can perform form validation or send the data to an API here
        console.log("Form Data Submitted:", formData);
    };

    return (
        <div className="px-7 h-screen grid justify-center items-center">
            <form
                className="grid gap-6"
                id="form"
                onSubmit={handleSubmit} // Add form submit handler
            >
                <div className="w-full flex gap-3">
                    <input
                        className="capitalize shadow-2xl p-3 ex w-full outline-none focus:border-solid focus:border-[1px] border-[#035ec5] placeholder:text-black"
                        type="text"
                        placeholder="First Name"
                        id="First-Name"
                        name="firstName"
                        value={formData.firstName} // Bind input value to state
                        onChange={handleInputChange} // Handle input changes
                        required
                    />
                    <input
                        className="p-3 capitalize shadow-2xl glass w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]"
                        type="text"
                        placeholder="Last Name"
                        id="Last-Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="grid gap-6 w-full">
                    <input
                        className="p-3 shadow-2xl glass w-full placeholder:text-black outline-none focus:border-solid border-[#035ec5] focus:border-[1px]"
                        type="email"
                        placeholder="Email"
                        id="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <input
                        className="p-3 shadow-2xl glass w-full text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]"
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="flex gap-3">
                    <input
                        className="p-3 glass shadow-2xl w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]"
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        className="p-3 glass shadow-2xl w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]"
                        type="password"
                        placeholder="Confirm password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button
                    className="outline-none glass shadow-2xl w-full p-3 bg-[#ffffff42] hover:border-[#035ec5] hover:border-solid hover:border-[1px] hover:text-[#035ec5] font-bold"
                    type="submit" // Form submission button
                >
                    Submit
                </button>
            </form>
        </div>
    );

}


export default Searchers;