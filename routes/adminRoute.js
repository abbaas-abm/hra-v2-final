const {Router} = require('express');
const {loginAdmin, registerAdmin, fetchAllDrivers} = require('../controllers/adminController')
const route = Router();
const protect = require('../middleware/authMiddleware');

// @desc register new driver
// @route   POST /driver/auth/register
// @access Public
route.post('/auth/register', registerAdmin)

// @desc authenticate existing driver
// @route   POST /driver/auth/login
// @access Public
route.post('/auth/login', loginAdmin);

// @desc fetch all drivers
// @route   GET /admin/drivers
// @access Public
route.get('/drivers', fetchAllDrivers);



module.exports = route;
