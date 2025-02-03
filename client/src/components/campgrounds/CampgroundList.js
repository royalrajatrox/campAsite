import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Get user info
import axios from "axios";

const CampgroundList = () => {
    const [campgrounds, setCampgrounds] = useState([]);
    const user = useSelector(state => state.auth); // Get logged-in user

    useEffect(() => {
        const fetchCampgrounds = async () => {
            try {
                const response = await axios.get("/api/campgrounds");
                setCampgrounds(response.data);
            } catch (error) {
                console.error("Error fetching campgrounds:", error);
            }
        };
        fetchCampgrounds();
    }, []);

    return (
        <div className="container">
            <h2>Available Campgrounds</h2>

            {user?.isAdmin && ( // Show button only if user is admin
                <Link to="/campgrounds/new" className="btn green">
                    Add New Campground
                </Link>
            )}

            <div className="row">
                {campgrounds.map((campground) => (
                    <div key={campground._id} className="col s12 m6 l4">
                        <div className="card">
                            <div className="card-content">
                                <h5>{campground.name}</h5>
                                <p>{campground.location}</p>
                                <p><strong>Price:</strong> ${campground.pricePerNight} per night</p>
                                <p>{campground.description}</p>
                            </div>
                            <div className="card-action">
                                <Link to={`/campgrounds/${campground._id}`} className="btn">View Details</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CampgroundList;
