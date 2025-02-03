import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import axios from "axios";

const ReservationForm = () => {
    const { campgroundId } = useParams();
    const history = useHistory(); // useHistory instead of useNavigate
    const [campground, setCampground] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const fetchCampground = async () => {
            try {
                const response = await axios.get(`/api/campgrounds/${campgroundId}`);
                setCampground(response.data);
            } catch (error) {
                console.error("Error fetching campground details:", error);
            }
        };
        fetchCampground();
    }, [campgroundId]);

    useEffect(() => {
        if (startDate && endDate && campground) {
            const nights = Math.ceil(
                (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
            );
            setTotalAmount(nights * campground.pricePerNight);
        }
    }, [startDate, endDate, campground]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/reservations", {
                campgroundId,
                startDate,
                endDate,
                totalAmount,
            });
            alert("Reservation successful!");
            history.push("/dashboard"); // Replace navigate() with history.push()
        } catch (error) {
            console.error("Error creating reservation:", error);
            alert("Error booking campsite. Try again.");
        }
    };

    if (!campground) {
        return <h3>Loading...</h3>;
    }

    return (
        <div className="container">
            <h2>Book {campground.name}</h2>
            <form onSubmit={handleSubmit}>
                <label>Check-in Date:</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />

                <label>Check-out Date:</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />

                <h4>Total Cost: ${totalAmount}</h4>

                <button type="submit" className="btn">Confirm Booking</button>
            </form>
        </div>
    );
};

export default ReservationForm;
