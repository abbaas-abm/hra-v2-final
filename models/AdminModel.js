const mongoose = require('mongoose');

// Define the schema for the Driver model
const adminSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true, // Email addresses must be unique
      trim: true,
      lowercase: true // Store emails in lowercase for consistency
    },
    password: {
      type: String,
      required: true
    }
}, {timestamps: true});

// Export the Driver model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
