const mongoose = require('mongoose');
const { Schema } = mongoose;

const campgroundSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    description: { type: String },
    image: { type: String }, // URL for an image of the campground
    availability: { type: Boolean, default: true }, // Whether it's available for booking
    createdAt: { type: Date, default: Date.now } // Timestamp for when the campground was added
});

mongoose.model('campgrounds', campgroundSchema);
