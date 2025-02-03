const mongoose = require('mongoose');
const {mongo} = require("mongoose");
const { Schema } = mongoose;
// this is destructuring

const userSchema = new Schema({
   googleId: String, // For Google OAuth login
   name: String, // Full name of the user
   email: { type: String, unique: true }, // Email address (must be unique)
   role: {
      type: String,
      enum: ['user', 'admin'], // Valid roles: 'user' or 'admin'
      default: 'user' // Default role for newly registered users
   },
   credits: { type: Number, default: 0 }, // User's survey credits or other usage
   isAdmin: { type: Boolean, default: false },
   createdAt: { type: Date, default: Date.now } // Timestamp for user creation
});



mongoose.model('users', userSchema);
