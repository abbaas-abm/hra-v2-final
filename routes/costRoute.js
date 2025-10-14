const {Router} = require('express');
const {getCost} = require('../controllers/costController');
const route = Router();

// @desc    Get Full Cost Of Delivery
// @route   POST /api/cost
// @access  Private
route.post('/', getCost)

module.exports = route;

// ------ INPUT -------
// {
//     "addressDetails": {
//         "pickup": "Lenasia South, Lenasia, South Africa",
//         "dropoff": "Wits Parktown Education Campus, Saint Andrews Road, Parktown, Johannesburg, South Africa"
//     },
//     "deliveryDetails": {
//         "pickupDate": "2025-09-16",
//         "pickupTime": "15:30",
//         "stairs": "4",
//         "items": [
//             { "id": 1, "name": "Chair", "weight": 10, "quantity": 5 },
//             { "id": 2, "name": "Table", "weight": 25, "quantity": 2 },
//             { "id": 2, "name": "Orange", "weight": 25, "quantity": 3}
//         ]
//     },
//     "personalDetails": {
//         "firstname":"Abbaas",
//         "lastname": "Mhlongo",
//         "email": "abbaasmhlongo@gmail.com",
//         "mobile": "111-222-3333",
//         "message": "Beware of scary dogs!"
//     }
// }

// ------ OUTPUT --------
// {
//     "addressDetails": {
//         "pickup": "Lenasia South, Lenasia, South Africa",
//         "dropoff": "Wits Parktown Education Campus, Saint Andrews Road, Parktown, Johannesburg, South Africa"
//     },
//     "deliveryDetails": {
//         "pickupDate": "2025-09-16",
//         "pickupTime": "15:30",
//         "stairs": "4",
//         "items": [
//             {
//                 "id": 1,
//                 "name": "Chair",
//                 "weight": 10,
//                 "quantity": 5
//             },
//             {
//                 "id": 2,
//                 "name": "Table",
//                 "weight": 25,
//                 "quantity": 2
//             },
//             {
//                 "id": 2,
//                 "name": "Orange",
//                 "weight": 25,
//                 "quantity": 3
//             }
//         ]
//     },
//     "personalDetails": {
//         "firstname": "Abbaas",
//         "lastname": "Mhlongo",
//         "email": "abbaasmhlongo@gmail.com",
//         "mobile": "111-222-3333",
//         "message": "Beware of scary dogs!"
//     },
//     "costs": {
//         "callOutFee": 389.827627,
//         "timeFee": 167.99783,
//         "fuelFee": 233.65742400000002,
//         "massFee": 175,
//         "itemFee": 3,
//         "stairFee": 200,
//         "total": 1169.482881,
//         "timeNum": 100.10000000000001
//     },
//     "tripDetails": {
//         "distance": 79.2,
//         "duration": "1.67 hrs"
//     }
// }