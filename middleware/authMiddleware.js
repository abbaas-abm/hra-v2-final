const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Driver = require('../models/DriverModel'); // Adjust the path as needed

// @desc    Protect routes from unauthenticated access
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the Authorization header exists and is in the 'Bearer <token>' format
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get the token from the header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the driver by the ID from the decoded token
      // We use .select('-userDetails.password') to exclude the password from the returned object
      req.driver = await Driver.findById(decoded.id).select('-userDetails.password');

      // If no driver is found, it means the token is for a non-existent user
      if (!req.driver) {
        res.status(401); // 401 Unauthorized
        throw new Error('Not authorized, driver not found');
      }

      // Call next() to proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  // If there is no token in the request header, throw an error
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = protect;
