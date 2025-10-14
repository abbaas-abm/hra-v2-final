require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandlerMiddleware');
const costRouteHandler = require('./routes/costRoute');
const orderRouteHandler = require('./routes/orderRoutes');
const userRouteHandler = require('./routes/userRoutes');
const driverRouteHandler = require('./routes/driverRoutes');
const adminRoute = require('./routes/adminRoute');
const emailRouteHandler = require('./routes/emailRoutes');

const PORT = process.env.PORT || 8000;
const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/cost', costRouteHandler);
app.use('/api/orders', orderRouteHandler);
app.use('/api/user', userRouteHandler);
app.use('/driver', driverRouteHandler);
app.use('/admin', adminRoute);
app.use('/email', emailRouteHandler);

// Serve frontend
app.use(express.static(path.join(__dirname, '/client/dist')));

// ✅ Catch-all fallback for React Router (Express 5 safe)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'));
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
