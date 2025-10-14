const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const Admin = require('../models/AdminModel'); // Adjust path as needed
const generateToken = require('../utils/generateJwtToken');
const Driver = require('../models/DriverModel');


// @desc    Register new driver
// @route   POST /auth/admin/register
// @access  Public
const registerAdmin = asyncHandler(async (req, res) => {
  const {
    firstName, lastName, password, email
  } = req.body || {};

  // Validate that all required fields are present
  if (!firstName || !lastName || !password || !email) {
    res.status(400);
    throw new Error('Please fill out all required fields');
  }

  // Check if a driver with the provided email already exists
  const adminExists = await Admin.findOne({email});

  if (adminExists) {
    res.status(400);
    throw new Error('Admin with that email already exists');
  }

  // Hash the password for security
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the new driver document in the database
  const admin = await Admin.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  if (admin) {
    // Respond with a success message, the new driver details, and a token
    res.status(201).json({
      message: 'Admin registered successfully',
      _id: admin.id,
      name: `${admin.firstName} ${admin.lastName}`,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid Admin data');
  }
});

// @desc    Authenticate existing driver
// @route   POST /auth/admin/login
// @access  Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find the driver by their email address
  const admin = await Admin.findOne({email});

  // Check if the driver exists and if the provided password is correct
  if (admin && (await bcrypt.compare(password, admin.password))) {
    // Passwords match, return success message and token
    res.json({
      message: 'Logged in successfully',
      _id: admin.id,
      name: `${admin.firstName} ${admin.lastName}`,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    // Incorrect email or password
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// @desc    Authenticate existing driver
// @route   POST /auth/admin/login
// @access  Public
const fetchAllDrivers = asyncHandler(async (req, res) => {
  const drivers = await Driver.find().select('-userDetails.password');
  
  if (!drivers) {
    res.status(400)
    throw new Error('Cannot Find Drivers!')
  }

  res.json(drivers)
});


module.exports = {
  registerAdmin,
  loginAdmin,
  fetchAllDrivers
};
