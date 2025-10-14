const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const mongoose = require('mongoose');


// @desc get all orders for a specific user
// @route   GET /api/orders/:userId
// @access Private
const getOrders = asyncHandler(async (req,res) => {
    const userId = req.params.userId;

    const orders = await Order.find({userId})

    res.status(201).json(orders)
})

// @desc get all orders
// @route   GET /api/orders/:userId
// @access Private
const getAllOrders = asyncHandler(async (req,res) => {
    const orders = await Order.find()

    res.status(201).json(orders)
})

// @desc get single order
// @route   GET /api/orders/single/:id
// @access Private
const getOrder = asyncHandler(async (req,res) =>{
    const {id} = req.params;

    const orders = await Order.find({id})

    res.status(201).json(orders)
})
// @desc get single order
// @route   POST /api/orders/confirm
// @access Private
const confirmPayment = asyncHandler(async (req,res) =>{
        const {payment_status, custom_str1} = req.body;

        if (!payment_status && !custom_str1) {
            res.status(400)
            throw new Error('Something went wrong with the request!')
        }

        if (payment_status === 'SUCCESS') {
            const finalalizeOrder = await Order.findByIdAndUpdate(custom_str1, {
                userPaid: true
            },
        {new: true})
        }

    res.json({status: 'success'})
})

// @desc create a new order
// @route   POST /api/orders
// @access Private
const createOrder = asyncHandler(async (req,res) =>{
   const {
    paymentMethod,
    addressDetails,
    deliveryDetails,
    personalDetails,
    costs,
    tripDetails,
    userId
  } = req.body

    if(!paymentMethod || !addressDetails || !deliveryDetails || !personalDetails, !costs, !tripDetails, !userId) {
        res.status(400)
        throw new Error('Bad Request :( Missing Data!');
    }

    const newOrder = await Order.create({
        paymentMethod,
        addressDetails,
        deliveryDetails,
        personalDetails,
        costs,
        tripDetails,
        userId
    })

    if (!newOrder) throw new Error('Something went wrong in the creation phase :(');

    res.status(201).json(newOrder)
})

// @desc update a single order
// @route   PUT /api/orders/:id
// @access Private
const updateOrder = asyncHandler(async (req, res) => {
    // const {id} = req.params;
    // const {title, description, summary, tags} = req.body || {};

    // if (!title || !description || !summary || !tags){
    //     res.status(400)
    //     throw new Error('Bad Request :( Title | Description | Summary | Tags are misssing');
    // }

    // const idea = await Idea.findById(id)

    // if (idea.user !== req.user._id.toString()){
    //     res.status(403)
    //     throw new Error('403 Not Authorised')
    // }

    // const ideaToUpdate = await Idea.findByIdAndUpdate(id, {
    //     title,
    //     description,
    //     summary,
    //     tags: typeof tags === 'string'
    //             ? tags.split(',').map(t => t.trim()).filter(Boolean)
    //             : Array.isArray(tags)
    //             ? tags
    //             : []
    // }, {new: true, runValidators: true});

    // if(!ideaToUpdate) {
    //     throw new Error('Something went Wrong :(')
    // }

    // res.status(200).json(ideaToUpdate);
})


// @desc delete a order note
// @route   DELETE /api/orders/:id
// @access Private
const deleteOrder = asyncHandler(async (req, res) => {
    // const {id} = req.params;

    //  const idea = await Idea.findById(id)

    // if (idea.user !== req.user._id.toString()){
    //     res.status(403)
    //     throw new Error('403 Not Authorised')
    // }

    // const deleteIdea = await Idea.findByIdAndDelete(id);

    // if (!deleteIdea) throw new Error(`Something went wrong in the deletion phase :(`);

    // res.status(200).json({message: 'Idea Deleted Succesfully :)'})
})

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,
    getAllOrders,
    confirmPayment
}
