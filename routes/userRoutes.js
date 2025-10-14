const {Router} = require('express');
const {getUserSingleOrder} = require('../controllers/userController');
const route = Router();


// @desc get single order
// @route   GET /api/user/order/:id
// @access Private
route.get('/order/:id', getUserSingleOrder);


module.exports = route;
