const {Router} = require('express');
const {sendStorageEmail, sendFridgeRentalEmail} = require('../controllers/emailController');
const route = Router();

const multer = require('multer');

// Use memory storage because files are only emailed, not saved to disk
const storage = multer.memoryStorage();
const upload = multer({ storage });

// define fields expected (names must match your frontend)
const fileFields = [
  { name: 'idCopy', maxCount: 1 },
  { name: 'proofOfResidence', maxCount: 1 },
  { name: 'bankStatement', maxCount: 1 },
];


// @desc send storage email
// @route   POST /email/storage
// @access Public
route.post('/storage',upload.fields(fileFields) , sendStorageEmail);


// @desc    Handle fridge rental order submission and send email
// @route   POST /email/fridge-rental
// @access  Public
route.post('/fridge',upload.fields(fileFields) , sendFridgeRentalEmail);


module.exports = route;
