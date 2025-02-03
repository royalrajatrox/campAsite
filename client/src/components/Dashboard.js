import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get("/api/reservations/user/:userId"); // Replace :userId dynamically later
                setReservations(response.data);
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        };
        fetchReservations();
    }, []);

    // Filter Reservations by Status
    const activeReservations = reservations.filter(res => res.status === "approved");
    const pendingReservations = reservations.filter(res => res.status === "pending");
    const pastReservations = reservations.filter(res => new Date(res.endDate) < new Date());

    return (
        <div style={styles.background}>
            <div style={styles.overlay}>
                <h1 style={styles.heading}>Welcome to Your CampAsite Dashboard</h1>
                <p style={styles.subtext}>Manage your campsite reservations effortlessly</p>

                {/* Stats Section */}
                <div style={styles.statsContainer}>
                    <div style={styles.cardRow}>
                        {/* Active Reservations */}
                        <div style={{ ...styles.card, backgroundColor: "#607d8b" }}>
                            <span style={styles.cardTitle}>Active Reservations</span>
                            <p>You currently have <strong>{activeReservations.length}</strong> active reservations.</p>
                        </div>

                        {/* Pending Reservations */}
                        <div style={{ ...styles.card, backgroundColor: "#00796b" }}>
                            <span style={styles.cardTitle}>Pending Requests</span>
                            <p>You have <strong>{pendingReservations.length}</strong> pending reservation requests.</p>
                        </div>

                        {/* Past Reservations */}
                        <div style={{ ...styles.card, backgroundColor: "#e65100" }}>
                            <span style={styles.cardTitle}>Past Reservations</span>
                            <p>You have <strong>{pastReservations.length}</strong> completed reservations.</p>
                        </div>
                    </div>
                </div>

                {/* Floating Action Button */}
                <div style={styles.actionButton}>
                    <Link to="/campgrounds" className="btn-floating btn-large red" title="Book a new campsite">
                        <i className="material-icons">add_location</i>
                    </Link>
                </div>

                {/* Footer Section */}
                <div style={styles.footer}>
                    <p>
                        Need Help?{" "}
                        <a href="mailto:support@campasite.com" style={styles.contactLink}>
                            Contact Support
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

// ✅ Styles for Full-Screen Background & UI Enhancements
const styles = {
    background: {
        backgroundImage: "url('/pexels-uriel-mont-6271635.jpg')", // Ensure this image is placed in public folder
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay for readability
        padding: "40px",
        borderRadius: "10px",
        width: "90%",
        maxWidth: "1000px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    heading: {
        fontSize: "3rem",
        fontWeight: "bold",
        color: "#fff",
        marginBottom: "20px",
    },
    subtext: {
        fontSize: "1.5rem",
        color: "#ddd",
        marginBottom: "30px",
    },
    statsContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    },
    cardRow: {
        display: "flex",
        gap: "20px",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    card: {
        padding: "20px",
        borderRadius: "10px",
        color: "#fff",
        textAlign: "center",
        minWidth: "250px",
        flex: "1",
    },
    cardTitle: {
        fontSize: "1.2rem",
        fontWeight: "bold",
    },
    actionButton: {
        marginTop: "30px",
    },
    footer: {
        marginTop: "40px",
        color: "#ccc",
    },
    contactLink: {
        color: "#00e676",
        textDecoration: "none",
    },
};

export default Dashboard;
