const {Router} = require('express');
const {getOrder, getOrders, createOrder,confirmPayment ,updateOrder, deleteOrder, getAllOrders} = require('../controllers/orderController');
const route = Router();

// @desc get all orders
// @route   GET /api/orders
// @access Private
route.get('/', getAllOrders)

// @desc get all orders for a specific user
// @route   GET /api/orders
// @access Private
route.get('/:userId', getOrders)

// @desc get single order
// @route   GET /api/orders/:id
// @access Private
route.get('/single/:id', getOrder);

// @desc create a new order
// @route   POST /api/orders
// @access Private
route.post('/',  createOrder);

// @desc update a single order
// @route   PUT /api/orders/:id
// @access Private
route.put('/:id',  updateOrder);

// @desc get single order
// @route   POST /api/orders/confirm
route.post('/confirm',  confirmPayment);

// @desc delete a order note
// @route   DELETE /api/orders/:id
// @access Private
route.delete('/:id', deleteOrder);

module.exports = route;
