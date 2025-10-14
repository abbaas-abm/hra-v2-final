const errorHandler = (err, req, res, next) => {
  // If a status code was already set by a previous middleware, use that.
  // Otherwise, default to a 500 (Internal Server Error).
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Set the status code on the response object
  res.status(statusCode);

  // Send a JSON response with the error message
  res.json({
    message: err.message,
    // In development, also include the stack trace for easier debugging.
    // This should be disabled in production for security.
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler
