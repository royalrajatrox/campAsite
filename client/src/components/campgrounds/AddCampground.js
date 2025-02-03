import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddCampground = () => {
    const history = useHistory();
    const [campground, setCampground] = useState({
        name: "",
        description: "",
        pricePerNight: "",
        location: ""
    });

    const handleChange = (e) => {
        setCampground({ ...campground, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/campgrounds", campground);
            alert("Campground added successfully!");
            history.push("/campgrounds");
        } catch (error) {
            console.error("Error adding campground:", error);
            alert("Failed to add campground.");
        }
    };

    return (
        <div className="container">
            <h2>Add New Campground</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={campground.name} onChange={handleChange} required />

                <label>Description:</label>
                <textarea name="description" value={campground.description} onChange={handleChange} required />

                <label>Price Per Night:</label>
                <input type="number" name="pricePerNight" value={campground.pricePerNight} onChange={handleChange} required />

                <label>Location:</label>
                <input type="text" name="location" value={campground.location} onChange={handleChange} required />

                <button type="submit" className="btn">Add Campground</button>
            </form>
        </div>
    );
};

export default AddCampground;
