const jwt = require('jsonwebtoken');

// Helper function to generate a JWT token
const generateToken = (id) => {
  // The JWT secret should be stored securely as an environment variable
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

module.exports = generateToken;