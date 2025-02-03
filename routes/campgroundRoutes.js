const express = require("express");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin"); // Ensure user is logged in
const requireAdmin = require("../middlewares/requireAdmin");

const Campground = mongoose.model("campgrounds");


module.exports = (app) => {


    app.get('/api/campgrounds', async (req, res) => {
        try {
            const campgrounds = await Campground.find({});
            res.send(campgrounds);
        } catch (err) {
            console.error("Error fetching campgrounds:", err);
            res.status(500).send({error: "Failed to fetch campgrounds"});
        }
    });

    app.get('/api/campgrounds/:id', async (req, res) => {
        try {
            const campground = await Campground.findById(req.params.id);
            if (!campground) {
                return res.status(404).json({ error: "Campground not found" });
            }
            res.json(campground);
        } catch (err) {
            console.error("Error fetching campgrounds:", err);
            res.status(500).json({ error: "Error fetching campground details" });
        }
    });


    app.post('/api/campgrounds', requireLogin, requireAdmin, async (req, res) => {
        const {name, description, pricePerNight, location} = req.body;

        const campground = new Campground({
            name: name,
            description: description,
            pricePerNight: pricePerNight,
            location: location
        });


        try {

            await campground.save();
            res.send(campground);

        } catch (err) {
            res.status(422).send(err);
        }


    });
};