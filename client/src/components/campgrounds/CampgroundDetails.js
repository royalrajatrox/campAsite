import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const CampgroundDetails = () => {
    const { id } = useParams();
    const [campground, setCampground] = useState(null);

    useEffect(() => {
        const fetchCampground = async () => {
            try {
                const response = await axios.get(`/api/campgrounds/${id}`);
                setCampground(response.data);
            } catch (error) {
                console.error("Error fetching campground details:", error);
            }
        };
        fetchCampground();
    }, [id]);

    if (!campground) {
        return <h3>Loading...</h3>;
    }

    return (
        <div className="container">
            <h2>{campground.name}</h2>
            <img src={campground.image} alt={campground.name} style={{ width: "100%", borderRadius: "10px" }} />
            <p><strong>Location:</strong> {campground.location}</p>
            <p><strong>Price:</strong> ${campground.pricePerNight} per night</p>
            <p>{campground.description}</p>
            <Link to={`/reserve/${campground._id}`} className="btn">Book Now</Link>
        </div>
    );
};

export default CampgroundDetails;
