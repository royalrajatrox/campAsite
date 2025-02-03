const mongoose = require("mongoose");
const { Schema } = mongoose;

const reservationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: [true, "User ID is required"]
    }, // ✅ Must match reservation route

    campgroundId: {
        type: Schema.Types.ObjectId,
        ref: "campgrounds",
        required: [true, "Campground ID is required"]
    },

    startDate: {
        type: Date,
        required: [true, "Start date is required"],
        validate: {
            validator: function (value) {
                return value > new Date();
            },
            message: "Start date must be in the future.",
        },
    },

    endDate: {
        type: Date,
        required: [true, "End date is required"],
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: "End date must be after the start date.",
        },
    },

    totalAmount: {
        type: Number,
        required: [true, "Total amount is required"],
        min: [1, "Total amount must be at least $1"]
    },

    status: {
        type: String,
        enum: ["pending", "approved", "rejected", "canceled"],
        default: "pending",
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
});

mongoose.model("reservations", reservationSchema);
