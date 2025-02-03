import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux"; // Import Redux hook

const UserReservations = () => {
    const [reservations, setReservations] = useState([]);

    // Get user ID from Redux state (assuming authentication is stored in Redux)
    const userId = useSelector(state => state.auth?._id);

    useEffect(() => {
        const fetchReservations = async () => {
            if (!userId) return; // Ensure userId is available

            try {
                const response = await axios.get(`/api/reservations/user/${userId}`);
                setReservations(response.data);
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        };
        fetchReservations();
    }, [userId]); // Re-run effect when userId changes

    // Separate upcoming and past reservations
    const upcomingReservations = reservations.filter(res => new Date(res.endDate) >= new Date());
    const pastReservations = reservations.filter(res => new Date(res.endDate) < new Date());

    return (
        <div className="container">
            <h2>Your Reservations</h2>

            {/* Upcoming Reservations */}
            <h4>Upcoming Reservations</h4>
            {upcomingReservations.length > 0 ? (
                upcomingReservations.map((res) => (
                    <div key={res._id} className="card">
                        <div className="card-content">
                            <h5>Campground: {res.campgroundId?.name}</h5>
                            <p><strong>Check-in:</strong> {new Date(res.startDate).toLocaleDateString()}</p>
                            <p><strong>Check-out:</strong> {new Date(res.endDate).toLocaleDateString()}</p>
                            <p><strong>Total Cost:</strong> ${res.totalAmount}</p>
                            <p><strong>Status:</strong> {res.status}</p>
                        </div>
                    </div>
                ))
            ) : <p>No upcoming reservations.</p>}

            {/* Past Reservations */}
            <h4>Past Reservations</h4>
            {pastReservations.length > 0 ? (
                pastReservations.map((res) => (
                    <div key={res._id} className="card">
                        <div className="card-content">
                            <h5>Campground: {res.campgroundId?.name}</h5>
                            <p><strong>Check-in:</strong> {new Date(res.startDate).toLocaleDateString()}</p>
                            <p><strong>Check-out:</strong> {new Date(res.endDate).toLocaleDateString()}</p>
                            <p><strong>Total Cost:</strong> ${res.totalAmount}</p>
                            <p><strong>Status:</strong> {res.status}</p>
                        </div>
                    </div>
                ))
            ) : <p>No past reservations.</p>}
        </div>
    );
};

export default UserReservations;
