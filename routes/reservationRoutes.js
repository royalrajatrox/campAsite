const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin"); // Ensure user is logged in

const Reservation = mongoose.model("reservations");

module.exports = (app) => {
    // ✅ Create a new reservation
    app.post("/api/reservations", requireLogin, async (req, res) => {
        console.log("🔹 Logged-in User:", req.user);
        console.log("🔹 Reservation Request Received:", req.body);

        const { campgroundId, startDate, endDate, totalAmount } = req.body;

        // ✅ Ensure req.user exists
        if (!req.user) {
            return res.status(401).json({ error: "User must be logged in to make a reservation" });
        }

        // ✅ Ensure all fields are provided
        if (!campgroundId || !startDate || !endDate || !totalAmount) {
            return res.status(400).json({ error: "All fields are required" });
        }

        try {
            const reservation = new Reservation({
                userId: req.user._id, // ✅ Match field name with the Reservation schema
                campgroundId,
                startDate,
                endDate,
                totalAmount,
                status: "pending",
            });

            await reservation.save();
            res.status(201).json(reservation); // ✅ Send back 201 Created
        } catch (err) {
            console.error("❌ Error creating reservation:", err);
            res.status(422).json({ error: "Failed to create reservation" });
        }
    });

    // ✅ Get reservations for a specific user
    app.get("/api/reservations/user/:userId", requireLogin, async (req, res) => {
        try {
            const reservations = await Reservation.find({ userId: req.params.userId });

            if (!reservations.length) {
                return res.status(404).json({ error: "No reservations found for this user" });
            }

            res.json(reservations);
        } catch (err) {
            console.error("❌ Error fetching reservations:", err);
            res.status(500).json({ error: "Error fetching reservation details" });
        }
    });
};
