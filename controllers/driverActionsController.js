const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const Driver = require("../models/DriverModel");

// @desc    driver accept order
// @route   PUT /driver/accept-order
// @access  Private
// {
//     "orderId": "acascasas", 
// }
const driverAcceptOrder = asyncHandler(async (req,res) => {
 const { orderId } = req.body;
  const driverId = req.driver._id; // `req.driver` is set by the protect middleware

  // Check for missing order ID in the request body
  if (!orderId) {
    res.status(400);
    throw new Error('Order ID is missing in the request body!');
  }

  // Find the order and update it only if it has not already been assigned to a driver.
  // This prevents race conditions where two drivers try to accept the same order at once.
  const updatedOrder = await Order.findOneAndUpdate(
    { _id: orderId, driver: { $ne: true } }, // Find the order only if 'driver' is not true
    {
      $set: {
        driver: true,
        driverId: driverId.toString()
      }
    },
    { new: true } // Return the updated document after the update
  );

  // If `updatedOrder` is null, it means either the order ID was invalid or
  // the order was already accepted by another driver.
  if (!updatedOrder) {
    res.status(400);
    throw new Error('Order not found or has already been accepted by another driver.');
  }

  // Respond with the updated order data
  res.status(200).json(updatedOrder);
})

// @desc    update order status
// @route   PUT /driver/update-order-status
// @access  Private
// {
//     orderId: 'string',
//     status: 'order-placed'
// }

const driverUpdateOrderStatus = asyncHandler(async (req,res) => {
    const { orderId, status } = req.body;
   
 // Check for missing required fields
  if (!orderId || !status) {
    res.status(400);
    throw new Error('Order ID and status are required!');
  }

  // Find the order and update its status
  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { status: status },
    { new: true, runValidators: true } // Return the updated document and run schema validators
  );

  // Check if the order was found and updated successfully
  if (!updatedOrder) {
    res.status(404); // Not Found
    throw new Error('Order not found.');
  }

  // Respond with the updated order data
  res.status(200).json(updatedOrder);
})



// @desc    get drivers' orders
// @route   GET /driver/orders
// @access  Private
const driverOrders =  asyncHandler(async (req,res) => {
    const driverId = req.driver._id;

    const driverOrders = await Order.find({driverId})

    res.json(driverOrders);
})

// @desc    get drivers' orders
// @route   GET /driver/orders
// @access  Private
const getDriverOrders =  asyncHandler(async (req,res) => {
    const {driverId} = req.params;

    const driverOrders = await Order.find({driverId})

    res.json(driverOrders);
})


// @desc    Pays out all driver's orders
// @route   GET /driver/clear-account/driverId
// @access  Private
const clearDriverAccount =  asyncHandler(async (req,res) => {
   const { driverId } = req.params;

    // 1. Find all unpaid orders for the driver
    const driverOrders = await Order.find({
        driverId,
    }) // Only select the ID for efficiency

    if (driverOrders.length === 0) {
        return res.status(200).json({
            message: "No unpaid orders found for this driver.",
            updatedCount: 0
        });
    }

    // 2. Create an array of update promises
    const updatePromises = driverOrders.map( (order) => {
        // Use a more efficient update operation for each order
        return Order.findByIdAndUpdate(order._id, 
            { driverPaid: true },
            { new: true} // Return the updated document
        );
    });

    // 3. Wait for ALL update promises to resolve concurrently
    const updatedOrders = await Promise.all(updatePromises);

    // 4. Send a meaningful response
    res.status(200).json({
        message: `Successfully paid out ${updatedOrders.length} orders for driver ${driverId}.`,
        updatedCount: updatedOrders.length,
        updatedOrders: updatedOrders // Optional: return the details of the updated orders
    });
})


// @desc    get drivesr active orders
// @route   GET /driver/active-orders
// @access  Private
const driverActiveOrders =  asyncHandler(async (req,res) => {
     const driverId = req.driver._id;

    // Find all orders that match the specified criteria
    const driverOrders = await Order.find({
      driverId: driverId,
      driver: true,
      status: { $ne: 'completed' } // $ne operator means "not equal"
    });

    // If no active orders are found, return an empty array and a success message
    if (driverOrders.length === 0) {
      return res.status(200).json({ message: 'No active orders found.', orders: [] });
    }

    res.status(200).json(driverOrders);
})


// @desc    get available orders
// @route   GET /driver/available-orders
// @access  Private
const availableOrders =  asyncHandler(async (req,res) => {
    const driverOrders = await Order.find({driver: false, driverId: null})

    if (!driverOrders){
        res.status(400)
        throw new Error('Error: Something went wrong :(')
    }

    res.json(driverOrders);
})


// @desc    get driver profile information
// @route   POST /driver/profile
// @access  Private
const getDriverProfile =  asyncHandler(async (req,res) => {
  const {driverId} = req.body;  
  
  const driverProfile = await Driver.findById(driverId);

  if (!driverProfile) {
    res.status(400)
    throw new Error('Error, Driver does not exist!')
  }

  res.json(driverProfile);
})


// @desc    get driver profile information
// @route   PUT /driver/update-driver-status
// @access  Private
const updateDriverStatus =  asyncHandler(async (req,res) => {
 const { driverId, isActive } = req.body;

  // Simple validation
  if (!driverId || typeof isActive !== 'boolean') {
    res.status(400);
    throw new Error('Invalid request: driverId and isActive are required.');
  }

  const driver = await Driver.findByIdAndUpdate(
    driverId,
    { isActive },
    { new: true }
  );

  if (!driver) {
    res.status(404);
    throw new Error('Driver not found.');
  }

  res.status(200).json({
    success: true,
    message: `Driver status updated successfully.`,
    data: driver,
  });
})


module.exports = {
    driverAcceptOrder,
    driverUpdateOrderStatus,
    driverOrders,
    availableOrders,
    getDriverProfile,
    driverActiveOrders,
    updateDriverStatus,
    getDriverOrders,
    clearDriverAccount
};