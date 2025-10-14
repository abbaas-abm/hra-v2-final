const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');


// @desc get single order
// @route   GET /api/user/order/:id
// @access Private
const getUserSingleOrder = asyncHandler(async (req,res) =>{
    const {id} = req.params;

    const orders = await Order.findById(id)

    res.status(201).json(orders)
})


module.exports = {
    getUserSingleOrder,
}
