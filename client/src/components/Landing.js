import React from "react";

const Landing = () => {
    return (
        <div
            style={{
                backgroundImage: "url('/pexels-therato-1933316.jpg')", // Using your uploaded image
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                width: "100vw",
                height: "100vh",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
            }}
        >
            <div
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay for readability
                    padding: "50px",
                    borderRadius: "10px",
                    width: "90%",
                    maxWidth: "1000px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "20px" }}>
                    Welcome to CampAsite!
                </h1>
                <p style={{ fontSize: "1.5rem", marginBottom: "30px", maxWidth: "700px" }}>
                    Discover, book, and enjoy your perfect camping experience.
                </p>

                <div style={{ display: "flex", justifyContent: "center", gap: "20px", width: "100%" }}>
                    <div className="card green darken-2" style={{ padding: "20px", flex: 1 }}>
                        <div className="card-content white-text">
                            <span className="card-title" style={{ fontWeight: "bold" }}>
                                Why CampAsite?
                            </span>
                            <p>
                                Easily find and book beautiful campsites for your next adventure.
                            </p>
                        </div>
                    </div>
                    <div className="card green darken-2" style={{ padding: "20px", flex: 1 }}>
                        <div className="card-content white-text">
                            <span className="card-title" style={{ fontWeight: "bold" }}>
                                Get Started Now!
                            </span>
                            <p>
                                Explore our campsite listings and book your next outdoor getaway.
                            </p>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: "30px", display: "flex", gap: "15px" }}>
                    <a
                        href="/campgrounds"
                        className="btn waves-effect waves-light green darken-1"
                    >
                        View Campsites
                    </a>
                    <a
                        href="/reservations"
                        className="btn waves-effect waves-light green darken-3"
                    >
                        Book Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Landing;
