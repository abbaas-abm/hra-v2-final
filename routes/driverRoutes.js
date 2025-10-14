const {Router} = require('express');
const {registerDriver, loginDriver} = require('../controllers/driverController');
const {driverAcceptOrder, driverUpdateOrderStatus,clearDriverAccount, driverOrders,getDriverOrders ,availableOrders, getDriverProfile, driverActiveOrders, updateDriverStatus} = require('../controllers/driverActionsController')
const route = Router();
const protect = require('../middleware/authMiddleware');

const multer = require('multer');

// Use memory storage because files are only emailed, not saved to disk
const storage = multer.memoryStorage();
const upload = multer({ storage });

// define fields expected (names must match your frontend)
const fileFields = [
  { name: 'idCopy', maxCount: 1 },
  { name: 'driversLicense', maxCount: 1 },
  { name: 'prdp', maxCount: 1 },
  { name: 'proofOfResidence', maxCount: 1 },
  { name: 'vehicleReg', maxCount: 1 },
  { name: 'vehicleLicenseDisk', maxCount: 1 },
  { name: 'vehicleRoadworthy', maxCount: 1 },
  { name: 'companyRegDocs', maxCount: 1 },
];

// @desc register new driver
// @route   POST /driver/auth/register
// @access Public
route.post('/auth/register', upload.fields(fileFields), registerDriver)

// @desc authenticate existing driver
// @route   POST /driver/auth/login
// @access Public
route.post('/auth/login', loginDriver);


// @desc    get drivers' orders
// @route   GET /driver/orders
// @access  Private
route.get('/orders', protect , driverOrders);

// @desc    driver accept order
// @route   PUT /driver/accept-order
// @access  Private
route.put('/accept-order', protect , driverAcceptOrder);


// @desc    update order status
// @route   PUT /driver/update-order-status
// @access  Private
route.put('/update-order-status', protect , driverUpdateOrderStatus);

// @desc    get available orders
// @route   GET /driver/available-orders
// @access  Private
route.get('/available-orders', protect , availableOrders);

// @desc    get driver profile data
// @route   POST /driver/profile
// @access  Private
route.post('/profile' , getDriverProfile);

// @desc    get driver profile data
// @route   POST /driver/update-driver-status
// @access  Private
route.put('/update-driver-status' , updateDriverStatus);

// @desc    get drivesr active orders
// @route   GET /driver/active-orders
// @access  Private
route.get('/active-orders', protect , driverActiveOrders);

// @desc    get drivesr active orders
// @route   GET /driver/active-orders
// @access  Private
route.get('/get-driver-orders/:driverId' , getDriverOrders);

// @desc    get drivesr active orders
// @route   GET /driver/active-orders
// @access  Private
route.put('/clear-account/:driverId' , clearDriverAccount);


module.exports = route;
