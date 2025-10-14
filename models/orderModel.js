const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    status: {type: String, default: 'order-placed'}, // order-placed | out-for-pickup | out-for-dropoff | completed
    paymentMethod: String,
    addressDetails: {
        pickup: String,
        dropoff: String
    },
    deliveryDetails: {
        pickupDate: String,
        pickupTime: String,
        stairs: String,
        items: [
            {
                id: String,
                name: String,
                weight: Number,
                quantity: Number
            }
        ]
    },
    personalDetails: {
        firstname: String,
        lastname: String,
        email:String,
        mobile: String,
        message: String
    },
    costs: {
        callOutFee: Number,
        timeFee: Number,
        fuelFee: Number,
        massFee: Number,
        itemFee: Number,
        stairFee: Number,
        total: Number,
        timeNum: Number
    },
    tripDetails: {
        distance: String,
        duration: String
    },
    driver: {
        type: Boolean,
        default: false
    },
    driverId: {
        type: String,
        default: null
    },
    userId: String,
    userPaid: {type: Boolean, default: false},
    driverPaid: {type:Boolean, default: false}
  }, {timestamps: true})


const OrderModel = mongoose.model('Order', OrderSchema);

module.exports = OrderModel;

