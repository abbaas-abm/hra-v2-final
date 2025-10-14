export const orders = [
    {
        id: "23dvdfdvfdv",
        "status": "out-for-dropoff",
        "paymentMethod": "EFT",
        "addressDetails": {
            "pickup": "17 Main St, City 1",
            "dropoff": "43 Park Ave, City 2"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-23",
            "pickupTime": "17:13 PM",
            "stairs": 4,
            "items": [
                {
                    "id": "item11",
                    "name": "Box",
                    "weight": 8,
                    "quantity": 2
                },
                {
                    "id": "item12",
                    "name": "Box",
                    "weight": 35,
                    "quantity": 4
                }
            ]
        },
        "personalDetails": {
            "firstname": "John",
            "lastname": "Doe",
            "email": "user1@example.com",
            "mobile": "0859091748",
            "message": "Please call on arrival"
        },
        "costs": {
            "callOutFee": 63,
            "timeFee": 52,
            "fuelFee": 16,
            "massFee": 36,
            "itemFee": 23,
            "stairFee": 200,
            "total": 390,
            "timeNum": 5
        },
        "tripDetails": {
            "distance": "43 km",
            "duration": "32 mins"
        },
        "driver": false,
        "driverId": "driver3",
        "userId": "user1",
        "userPaid": false,
        "driverPaid": true
    },
    {
        id: "32f3qfrv",
        "status": "out-for-dropoff",
        "paymentMethod": "Cash",
        "addressDetails": {
            "pickup": "64 Main St, City 2",
            "dropoff": "13 Park Ave, City 3"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-23",
            "pickupTime": "9:19 AM",
            "stairs": 7,
            "items": [
                {
                    "id": "item21",
                    "name": "Chair",
                    "weight": 19,
                    "quantity": 3
                },
                {
                    "id": "item22",
                    "name": "Box",
                    "weight": 17,
                    "quantity": 1
                }
            ]
        },
        "personalDetails": {
            "firstname": "Jane",
            "lastname": "Smith",
            "email": "user2@example.com",
            "mobile": "0827160445",
            "message": "Please call on arrival"
        },
        "costs": {
            "callOutFee": 71,
            "timeFee": 48,
            "fuelFee": 19,
            "massFee": 36,
            "itemFee": 14,
            "stairFee": 350,
            "total": 538,
            "timeNum": 1
        },
        "tripDetails": {
            "distance": "14 km",
            "duration": "43 mins"
        },
        "driver": false,
        "driverId": "driver2",
        "userId": "user1",
        "userPaid": false,
        "driverPaid": false
    },
    {
        id: "03403fk0kf",
        "status": "out-for-dropoff",
        "paymentMethod": "Credit Card",
        "addressDetails": {
            "pickup": "26 Main St, City 3",
            "dropoff": "91 Park Ave, City 4"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-23",
            "pickupTime": "15:49 AM",
            "stairs": 12,
            "items": [
                {
                    "id": "item31",
                    "name": "Microwave",
                    "weight": 1,
                    "quantity": 5
                },
                {
                    "id": "item32",
                    "name": "Desk",
                    "weight": 46,
                    "quantity": 2
                }
            ]
        },
        "personalDetails": {
            "firstname": "Alice",
            "lastname": "Brown",
            "email": "user3@example.com",
            "mobile": "0854624328",
            "message": ""
        },
        "costs": {
            "callOutFee": 60,
            "timeFee": 46,
            "fuelFee": 45,
            "massFee": 25,
            "itemFee": 12,
            "stairFee": 600,
            "total": 788,
            "timeNum": 4
        },
        "tripDetails": {
            "distance": "10 km",
            "duration": "84 mins"
        },
        "driver": true,
        "driverId": null,
        "userId": "user3",
        "userPaid": false,
        "driverPaid": false
    },
    {
        id: "xmvdis09",
        "status": "order-placed",
        "paymentMethod": "EFT",
        "addressDetails": {
            "pickup": "24 Main St, City 4",
            "dropoff": "24 Park Ave, City 5"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-19",
            "pickupTime": "12:20 PM",
            "stairs": 8,
            "items": [
                {
                    "id": "item41",
                    "name": "Chair",
                    "weight": 30,
                    "quantity": 5
                }
            ]
        },
        "personalDetails": {
            "firstname": "Bob",
            "lastname": "Johnson",
            "email": "user4@example.com",
            "mobile": "0881143069",
            "message": "Fragile"
        },
        "costs": {
            "callOutFee": 72,
            "timeFee": 28,
            "fuelFee": 30,
            "massFee": 19,
            "itemFee": 17,
            "stairFee": 400,
            "total": 566,
            "timeNum": 5
        },
        "tripDetails": {
            "distance": "20 km",
            "duration": "16 mins"
        },
        "driver": true,
        "driverId": "driver5",
        "userId": "user1",
        "userPaid": false,
        "driverPaid": true
    },
    {
        id: "cmkvsvmop3",
        "status": "completed",
        "paymentMethod": "EFT",
        "addressDetails": {
            "pickup": "31 Main St, City 5",
            "dropoff": "23 Park Ave, City 6"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-21",
            "pickupTime": "17:51 PM",
            "stairs": 9,
            "items": [
                {
                    "id": "item51",
                    "name": "Sofa",
                    "weight": 15,
                    "quantity": 5
                },
                {
                    "id": "item52",
                    "name": "Sofa",
                    "weight": 38,
                    "quantity": 5
                },
                {
                    "id": "item53",
                    "name": "Microwave",
                    "weight": 20,
                    "quantity": 3
                }
            ]
        },
        "personalDetails": {
            "firstname": "Charlie",
            "lastname": "Davis",
            "email": "user5@example.com",
            "mobile": "0886924876",
            "message": ""
        },
        "costs": {
            "callOutFee": 58,
            "timeFee": 31,
            "fuelFee": 34,
            "massFee": 30,
            "itemFee": 21,
            "stairFee": 450,
            "total": 624,
            "timeNum": 1
        },
        "tripDetails": {
            "distance": "22 km",
            "duration": "101 mins"
        },
        "driver": false,
        "driverId": null,
        "userId": "user5",
        "userPaid": false,
        "driverPaid": true
    },
    {
        id: "ld0000s",
        "status": "completed",
        "paymentMethod": "EFT",
        "addressDetails": {
            "pickup": "47 Main St, City 6",
            "dropoff": "17 Park Ave, City 7"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-18",
            "pickupTime": "10:14 AM",
            "stairs": 9,
            "items": [
                {
                    "id": "item61",
                    "name": "Chair",
                    "weight": 37,
                    "quantity": 1
                },
                {
                    "id": "item62",
                    "name": "Fridge",
                    "weight": 32,
                    "quantity": 3
                }
            ]
        },
        "personalDetails": {
            "firstname": "John",
            "lastname": "Doe",
            "email": "user6@example.com",
            "mobile": "0849249937",
            "message": ""
        },
        "costs": {
            "callOutFee": 80,
            "timeFee": 52,
            "fuelFee": 27,
            "massFee": 19,
            "itemFee": 21,
            "stairFee": 450,
            "total": 649,
            "timeNum": 2
        },
        "tripDetails": {
            "distance": "23 km",
            "duration": "21 mins"
        },
        "driver": false,
        "driverId": null,
        "userId": "user1",
        "userPaid": false,
        "driverPaid": true
    },
    {
        id: "dmvsdmvlsdc",
        "status": "completed",
        "paymentMethod": "Credit Card",
        "addressDetails": {
            "pickup": "30 Main St, City 7",
            "dropoff": "100 Park Ave, City 8"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-22",
            "pickupTime": "14:32 PM",
            "stairs": 8,
            "items": [
                {
                    "id": "item71",
                    "name": "Microwave",
                    "weight": 44,
                    "quantity": 4
                },
                {
                    "id": "item72",
                    "name": "Microwave",
                    "weight": 31,
                    "quantity": 5
                },
                {
                    "id": "item73",
                    "name": "Sofa",
                    "weight": 15,
                    "quantity": 3
                }
            ]
        },
        "personalDetails": {
            "firstname": "Jane",
            "lastname": "Smith",
            "email": "user7@example.com",
            "mobile": "0842080233",
            "message": "Please call on arrival"
        },
        "costs": {
            "callOutFee": 59,
            "timeFee": 47,
            "fuelFee": 47,
            "massFee": 39,
            "itemFee": 18,
            "stairFee": 400,
            "total": 610,
            "timeNum": 5
        },
        "tripDetails": {
            "distance": "42 km",
            "duration": "74 mins"
        },
        "driver": true,
        "driverId": "driver8",
        "userId": "user1",
        "userPaid": false,
        "driverPaid": false
    },
    {
        id: "mvlsdvlsdf",
        "paymentMethod": "Cash",
        "addressDetails": {
            "pickup": "86 Main St, City 8",
            "dropoff": "3 Park Ave, City 9"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-19",
            "pickupTime": "17:19 PM",
            "stairs": 3,
            "items": [
                {
                    "id": "item81",
                    "name": "Fridge",
                    "weight": 41,
                    "quantity": 5
                }
            ]
        },
        "personalDetails": {
            "firstname": "Alice",
            "lastname": "Brown",
            "email": "user8@example.com",
            "mobile": "0843475174",
            "message": "Handle with care"
        },
        "costs": {
            "callOutFee": 67,
            "timeFee": 51,
            "fuelFee": 30,
            "massFee": 23,
            "itemFee": 17,
            "stairFee": 150,
            "total": 338,
            "timeNum": 3
        },
        "tripDetails": {
            "distance": "28 km",
            "duration": "21 mins"
        },
        "driver": true,
        "driverId": null,
        "userId": "user1",
        "userPaid": false,
        "driverPaid": false
    },
    {
        id: "mmmvds0dv",
        "status": "out-for-pickup",
        "paymentMethod": "Cash",
        "addressDetails": {
            "pickup": "59 Main St, City 9",
            "dropoff": "92 Park Ave, City 10"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-18",
            "pickupTime": "15:48 AM",
            "stairs": 1,
            "items": [
                {
                    "id": "item91",
                    "name": "Fridge",
                    "weight": 28,
                    "quantity": 2
                },
                {
                    "id": "item92",
                    "name": "Fridge",
                    "weight": 50,
                    "quantity": 4
                },
                {
                    "id": "item93",
                    "name": "Sofa",
                    "weight": 25,
                    "quantity": 3
                }
            ]
        },
        "personalDetails": {
            "firstname": "Bob",
            "lastname": "Johnson",
            "email": "user9@example.com",
            "mobile": "0845096614",
            "message": "Please call on arrival"
        },
        "costs": {
            "callOutFee": 96,
            "timeFee": 55,
            "fuelFee": 34,
            "massFee": 29,
            "itemFee": 25,
            "stairFee": 50,
            "total": 289,
            "timeNum": 3
        },
        "tripDetails": {
            "distance": "27 km",
            "duration": "56 mins"
        },
        "driver": true,
        "driverId": "driver6",
        "userId": "user9",
        "userPaid": true,
        "driverPaid": false
    },
    {
        id: "xxxxxxxxxx",
        "status": "out-for-pickup",
        "paymentMethod": "Cash",
        "addressDetails": {
            "pickup": "41 Main St, City 10",
            "dropoff": "42 Park Ave, City 11"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-21",
            "pickupTime": "16:58 AM",
            "stairs": 10,
            "items": [
                {
                    "id": "item101",
                    "name": "Box",
                    "weight": 15,
                    "quantity": 2
                }
            ]
        },
        "personalDetails": {
            "firstname": "Charlie",
            "lastname": "Davis",
            "email": "user10@example.com",
            "mobile": "0860631957",
            "message": ""
        },
        "costs": {
            "callOutFee": 73,
            "timeFee": 31,
            "fuelFee": 48,
            "massFee": 30,
            "itemFee": 29,
            "stairFee": 500,
            "total": 711,
            "timeNum": 3
        },
        "tripDetails": {
            "distance": "37 km",
            "duration": "119 mins"
        },
        "driver": true,
        "driverId": "driver5",
        "userId": "user1",
        "userPaid": true,
        "driverPaid": false
    },
    {
        id: "xvmmmmmm",
        "status": "order-placed",
        "paymentMethod": "EFT",
        "addressDetails": {
            "pickup": "46 Main St, City 11",
            "dropoff": "20 Park Ave, City 12"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-23",
            "pickupTime": "16:04 PM",
            "stairs": 7,
            "items": [
                {
                    "id": "item111",
                    "name": "Desk",
                    "weight": 37,
                    "quantity": 5
                },
                {
                    "id": "item112",
                    "name": "Box",
                    "weight": 35,
                    "quantity": 1
                }
            ]
        },
        "personalDetails": {
            "firstname": "John",
            "lastname": "Doe",
            "email": "user11@example.com",
            "mobile": "0825555691",
            "message": ""
        },
        "costs": {
            "callOutFee": 74,
            "timeFee": 30,
            "fuelFee": 18,
            "massFee": 32,
            "itemFee": 29,
            "stairFee": 350,
            "total": 533,
            "timeNum": 3
        },
        "tripDetails": {
            "distance": "16 km",
            "duration": "82 mins"
        },
        "driver": false,
        "driverId": null,
        "userId": "user1",
        "userPaid": false,
        "driverPaid": true
    },
    {
        id: "lllc00",
        "status": "order-placed",
        "paymentMethod": "Cash",
        "addressDetails": {
            "pickup": "67 Main St, City 12",
            "dropoff": "83 Park Ave, City 13"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-19",
            "pickupTime": "13:01 PM",
            "stairs": 7,
            "items": [
                {
                    "id": "item121",
                    "name": "Desk",
                    "weight": 7,
                    "quantity": 5
                }
            ]
        },
        "personalDetails": {
            "firstname": "Jane",
            "lastname": "Smith",
            "email": "user12@example.com",
            "mobile": "0850164186",
            "message": "Handle with care"
        },
        "costs": {
            "callOutFee": 95,
            "timeFee": 21,
            "fuelFee": 35,
            "massFee": 30,
            "itemFee": 17,
            "stairFee": 350,
            "total": 548,
            "timeNum": 2
        },
        "tripDetails": {
            "distance": "5 km",
            "duration": "44 mins"
        },
        "driver": true,
        "driverId": null,
        "userId": "user1",
        "userPaid": false,
        "driverPaid": false
    },
    {
        id: "llllls",
        "status": "out-for-dropoff",
        "paymentMethod": "Cash",
        "addressDetails": {
            "pickup": "22 Main St, City 13",
            "dropoff": "52 Park Ave, City 14"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-20",
            "pickupTime": "9:40 PM",
            "stairs": 11,
            "items": [
                {
                    "id": "item131",
                    "name": "Sofa",
                    "weight": 5,
                    "quantity": 3
                },
                {
                    "id": "item132",
                    "name": "Box",
                    "weight": 31,
                    "quantity": 3
                },
                {
                    "id": "item133",
                    "name": "Desk",
                    "weight": 25,
                    "quantity": 5
                }
            ]
        },
        "personalDetails": {
            "firstname": "Alice",
            "lastname": "Brown",
            "email": "user13@example.com",
            "mobile": "0884307644",
            "message": "Fragile"
        },
        "costs": {
            "callOutFee": 81,
            "timeFee": 25,
            "fuelFee": 38,
            "massFee": 32,
            "itemFee": 15,
            "stairFee": 550,
            "total": 741,
            "timeNum": 4
        },
        "tripDetails": {
            "distance": "11 km",
            "duration": "30 mins"
        },
        "driver": true,
        "driverId": null,
        "userId": "user13",
        "userPaid": true,
        "driverPaid": true
    },
    {
        id: "cvvvcvcvcvc",
        "status": "completed",
        "paymentMethod": "Cash",
        "addressDetails": {
            "pickup": "89 Main St, City 14",
            "dropoff": "15 Park Ave, City 15"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-24",
            "pickupTime": "12:18 AM",
            "stairs": 7,
            "items": [
                {
                    "id": "item141",
                    "name": "Desk",
                    "weight": 24,
                    "quantity": 3
                },
                {
                    "id": "item142",
                    "name": "Fridge",
                    "weight": 46,
                    "quantity": 2
                },
                {
                    "id": "item143",
                    "name": "Chair",
                    "weight": 5,
                    "quantity": 5
                }
            ]
        },
        "personalDetails": {
            "firstname": "Bob",
            "lastname": "Johnson",
            "email": "user14@example.com",
            "mobile": "0842653069",
            "message": "Fragile"
        },
        "costs": {
            "callOutFee": 57,
            "timeFee": 35,
            "fuelFee": 43,
            "massFee": 20,
            "itemFee": 13,
            "stairFee": 350,
            "total": 518,
            "timeNum": 1
        },
        "tripDetails": {
            "distance": "46 km",
            "duration": "35 mins"
        },
        "driver": false,
        "driverId": "driver7",
        "userId": "user14",
        "userPaid": false,
        "driverPaid": false
    },
    {
        id: "lsovosdovos",
        "status": "completed",
        "paymentMethod": "EFT",
        "addressDetails": {
            "pickup": "81 Main St, City 15",
            "dropoff": "15 Park Ave, City 16"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-25",
            "pickupTime": "9:17 PM",
            "stairs": 8,
            "items": [
                {
                    "id": "item151",
                    "name": "Desk",
                    "weight": 28,
                    "quantity": 2
                },
                {
                    "id": "item152",
                    "name": "Fridge",
                    "weight": 33,
                    "quantity": 4
                },
                {
                    "id": "item153",
                    "name": "Sofa",
                    "weight": 45,
                    "quantity": 2
                }
            ]
        },
        "personalDetails": {
            "firstname": "Charlie",
            "lastname": "Davis",
            "email": "user15@example.com",
            "mobile": "0821260112",
            "message": ""
        },
        "costs": {
            "callOutFee": 69,
            "timeFee": 39,
            "fuelFee": 45,
            "massFee": 15,
            "itemFee": 28,
            "stairFee": 400,
            "total": 596,
            "timeNum": 1
        },
        "tripDetails": {
            "distance": "30 km",
            "duration": "27 mins"
        },
        "driver": false,
        "driverId": null,
        "userId": "user15",
        "userPaid": true,
        "driverPaid": true
    },
    {
        id: "sdmvsjdvnsd",
        "status": "out-for-dropoff",
        "paymentMethod": "Credit Card",
        "addressDetails": {
            "pickup": "3 Main St, City 16",
            "dropoff": "62 Park Ave, City 17"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-20",
            "pickupTime": "16:42 AM",
            "stairs": 11,
            "items": [
                {
                    "id": "item161",
                    "name": "Box",
                    "weight": 34,
                    "quantity": 1
                },
                {
                    "id": "item162",
                    "name": "Fridge",
                    "weight": 12,
                    "quantity": 4
                },
                {
                    "id": "item163",
                    "name": "Sofa",
                    "weight": 8,
                    "quantity": 2
                }
            ]
        },
        "personalDetails": {
            "firstname": "John",
            "lastname": "Doe",
            "email": "user16@example.com",
            "mobile": "0838132619",
            "message": "Handle with care"
        },
        "costs": {
            "callOutFee": 58,
            "timeFee": 22,
            "fuelFee": 25,
            "massFee": 12,
            "itemFee": 29,
            "stairFee": 550,
            "total": 696,
            "timeNum": 4
        },
        "tripDetails": {
            "distance": "34 km",
            "duration": "120 mins"
        },
        "driver": false,
        "driverId": null,
        "userId": "user16",
        "userPaid": false,
        "driverPaid": false
    },
    {
        id: "cvmlvsdlvl",
        "status": "completed",
        "paymentMethod": "EFT",
        "addressDetails": {
            "pickup": "35 Main St, City 17",
            "dropoff": "18 Park Ave, City 18"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-18",
            "pickupTime": "16:12 PM",
            "stairs": 1,
            "items": [
                {
                    "id": "item171",
                    "name": "Desk",
                    "weight": 1,
                    "quantity": 4
                },
                {
                    "id": "item172",
                    "name": "Sofa",
                    "weight": 30,
                    "quantity": 3
                }
            ]
        },
        "personalDetails": {
            "firstname": "Jane",
            "lastname": "Smith",
            "email": "user17@example.com",
            "mobile": "0883504241",
            "message": ""
        },
        "costs": {
            "callOutFee": 91,
            "timeFee": 60,
            "fuelFee": 29,
            "massFee": 13,
            "itemFee": 22,
            "stairFee": 50,
            "total": 265,
            "timeNum": 3
        },
        "tripDetails": {
            "distance": "33 km",
            "duration": "19 mins"
        },
        "driver": false,
        "driverId": "driver8",
        "userId": "user17",
        "userPaid": true,
        "driverPaid": true
    },
    {
        id: "dsmvsldvsd",
        "status": "out-for-pickup",
        "paymentMethod": "EFT",
        "addressDetails": {
            "pickup": "42 Main St, City 18",
            "dropoff": "93 Park Ave, City 19"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-21",
            "pickupTime": "15:13 AM",
            "stairs": 1,
            "items": [
                {
                    "id": "item181",
                    "name": "Sofa",
                    "weight": 5,
                    "quantity": 3
                },
                {
                    "id": "item182",
                    "name": "Box",
                    "weight": 34,
                    "quantity": 1
                }
            ]
        },
        "personalDetails": {
            "firstname": "Alice",
            "lastname": "Brown",
            "email": "user18@example.com",
            "mobile": "0888175647",
            "message": "Handle with care"
        },
        "costs": {
            "callOutFee": 78,
            "timeFee": 56,
            "fuelFee": 24,
            "massFee": 22,
            "itemFee": 25,
            "stairFee": 50,
            "total": 255,
            "timeNum": 3
        },
        "tripDetails": {
            "distance": "5 km",
            "duration": "30 mins"
        },
        "driver": true,
        "driverId": "driver3",
        "userId": "user18",
        "userPaid": false,
        "driverPaid": false
    },
    {
        id: "mmmclsod",
        "status": "order-placed",
        "paymentMethod": "EFT",
        "addressDetails": {
            "pickup": "58 Main St, City 19",
            "dropoff": "90 Park Ave, City 20"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-19",
            "pickupTime": "8:37 PM",
            "stairs": 5,
            "items": [
                {
                    "id": "item191",
                    "name": "Sofa",
                    "weight": 30,
                    "quantity": 4
                }
            ]
        },
        "personalDetails": {
            "firstname": "Bob",
            "lastname": "Johnson",
            "email": "user19@example.com",
            "mobile": "0838453238",
            "message": "Fragile"
        },
        "costs": {
            "callOutFee": 93,
            "timeFee": 52,
            "fuelFee": 24,
            "massFee": 19,
            "itemFee": 21,
            "stairFee": 250,
            "total": 459,
            "timeNum": 2
        },
        "tripDetails": {
            "distance": "32 km",
            "duration": "66 mins"
        },
        "driver": true,
        "driverId": null,
        "userId": "user19",
        "userPaid": false,
        "driverPaid": true
    },
    {
        id: "mmmmmmmm",
        "status": "order-placed",
        "paymentMethod": "Credit Card",
        "addressDetails": {
            "pickup": "15 Main St, City 20",
            "dropoff": "61 Park Ave, City 21"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-24",
            "pickupTime": "16:18 AM",
            "stairs": 3,
            "items": [
                {
                    "id": "item201",
                    "name": "Sofa",
                    "weight": 47,
                    "quantity": 5
                }
            ]
        },
        "personalDetails": {
            "firstname": "Charlie",
            "lastname": "Davis",
            "email": "user20@example.com",
            "mobile": "0814268630",
            "message": "Please call on arrival"
        },
        "costs": {
            "callOutFee": 90,
            "timeFee": 46,
            "fuelFee": 16,
            "massFee": 14,
            "itemFee": 10,
            "stairFee": 150,
            "total": 326,
            "timeNum": 1
        },
        "tripDetails": {
            "distance": "31 km",
            "duration": "33 mins"
        },
        "driver": false,
        "driverId": null,
        "userId": "user20",
        "userPaid": true,
        "driverPaid": true
    },
    {
        id: "dvmsdlvls",
        "status": "out-for-dropoff",
        "paymentMethod": "EFT",
        "addressDetails": {
            "pickup": "50 Main St, City 21",
            "dropoff": "32 Park Ave, City 22"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-20",
            "pickupTime": "11:21 AM",
            "stairs": 10,
            "items": [
                {
                    "id": "item211",
                    "name": "Sofa",
                    "weight": 39,
                    "quantity": 1
                },
                {
                    "id": "item212",
                    "name": "Fridge",
                    "weight": 27,
                    "quantity": 4
                },
                {
                    "id": "item213",
                    "name": "Fridge",
                    "weight": 36,
                    "quantity": 1
                }
            ]
        },
        "personalDetails": {
            "firstname": "John",
            "lastname": "Doe",
            "email": "user21@example.com",
            "mobile": "0812872823",
            "message": "Handle with care"
        },
        "costs": {
            "callOutFee": 76,
            "timeFee": 25,
            "fuelFee": 37,
            "massFee": 40,
            "itemFee": 11,
            "stairFee": 500,
            "total": 689,
            "timeNum": 4
        },
        "tripDetails": {
            "distance": "16 km",
            "duration": "47 mins"
        },
        "driver": false,
        "driverId": "driver2",
        "userId": "user21",
        "userPaid": true,
        "driverPaid": false
    },
    {
        id: "mlclvsdv",
        "status": "order-placed",
        "paymentMethod": "Cash",
        "addressDetails": {
            "pickup": "74 Main St, City 22",
            "dropoff": "34 Park Ave, City 23"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-25",
            "pickupTime": "14:29 AM",
            "stairs": 6,
            "items": [
                {
                    "id": "item221",
                    "name": "Desk",
                    "weight": 16,
                    "quantity": 3
                },
                {
                    "id": "item222",
                    "name": "Sofa",
                    "weight": 43,
                    "quantity": 5
                },
                {
                    "id": "item223",
                    "name": "Chair",
                    "weight": 35,
                    "quantity": 1
                }
            ]
        },
        "personalDetails": {
            "firstname": "Jane",
            "lastname": "Smith",
            "email": "user22@example.com",
            "mobile": "0831267562",
            "message": ""
        },
        "costs": {
            "callOutFee": 78,
            "timeFee": 41,
            "fuelFee": 21,
            "massFee": 24,
            "itemFee": 17,
            "stairFee": 300,
            "total": 481,
            "timeNum": 2
        },
        "tripDetails": {
            "distance": "42 km",
            "duration": "103 mins"
        },
        "driver": false,
        "driverId": null,
        "userId": "user22",
        "userPaid": true,
        "driverPaid": true
    },
    {
        id: "mvlsd-vsd",
        "status": "out-for-dropoff",
        "paymentMethod": "Credit Card",
        "addressDetails": {
            "pickup": "86 Main St, City 23",
            "dropoff": "38 Park Ave, City 24"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-25",
            "pickupTime": "12:37 AM",
            "stairs": 6,
            "items": [
                {
                    "id": "item231",
                    "name": "Fridge",
                    "weight": 50,
                    "quantity": 2
                },
                {
                    "id": "item232",
                    "name": "Chair",
                    "weight": 14,
                    "quantity": 2
                }
            ]
        },
        "personalDetails": {
            "firstname": "Alice",
            "lastname": "Brown",
            "email": "user23@example.com",
            "mobile": "0854260434",
            "message": "Please call on arrival"
        },
        "costs": {
            "callOutFee": 95,
            "timeFee": 21,
            "fuelFee": 32,
            "massFee": 10,
            "itemFee": 24,
            "stairFee": 300,
            "total": 482,
            "timeNum": 5
        },
        "tripDetails": {
            "distance": "17 km",
            "duration": "73 mins"
        },
        "driver": false,
        "driverId": "driver4",
        "userId": "user23",
        "userPaid": true,
        "driverPaid": true
    },
    {
        id: "sdmvmdmvsdm",
        "status": "completed",
        "paymentMethod": "Cash",
        "addressDetails": {
            "pickup": "66 Main St, City 24",
            "dropoff": "4 Park Ave, City 25"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-21",
            "pickupTime": "16:43 AM",
            "stairs": 3,
            "items": [
                {
                    "id": "item241",
                    "name": "Sofa",
                    "weight": 29,
                    "quantity": 3
                }
            ]
        },
        "personalDetails": {
            "firstname": "Bob",
            "lastname": "Johnson",
            "email": "user24@example.com",
            "mobile": "0840457949",
            "message": "Please call on arrival"
        },
        "costs": {
            "callOutFee": 97,
            "timeFee": 33,
            "fuelFee": 21,
            "massFee": 39,
            "itemFee": 20,
            "stairFee": 150,
            "total": 360,
            "timeNum": 5
        },
        "tripDetails": {
            "distance": "13 km",
            "duration": "12 mins"
        },
        "driver": false,
        "driverId": null,
        "userId": "user24",
        "userPaid": false,
        "driverPaid": true
    },
    {
        id: "sdmdlsdlsl",
        "status": "out-for-pickup",
        "paymentMethod": "EFT",
        "addressDetails": {
            "pickup": "48 Main St, City 25",
            "dropoff": "92 Park Ave, City 26"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-19",
            "pickupTime": "13:08 PM",
            "stairs": 1,
            "items": [
                {
                    "id": "item251",
                    "name": "Fridge",
                    "weight": 36,
                    "quantity": 5
                }
            ]
        },
        "personalDetails": {
            "firstname": "Charlie",
            "lastname": "Davis",
            "email": "user25@example.com",
            "mobile": "0832013152",
            "message": "Fragile"
        },
        "costs": {
            "callOutFee": 59,
            "timeFee": 37,
            "fuelFee": 24,
            "massFee": 11,
            "itemFee": 20,
            "stairFee": 50,
            "total": 201,
            "timeNum": 1
        },
        "tripDetails": {
            "distance": "31 km",
            "duration": "17 mins"
        },
        "driver": false,
        "driverId": null,
        "userId": "user25",
        "userPaid": true,
        "driverPaid": false
    },
    {
        id: "llsvlslvdsd",
        "status": "out-for-pickup",
        "paymentMethod": "Cash",
        "addressDetails": {
            "pickup": "25 Main St, City 26",
            "dropoff": "100 Park Ave, City 27"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-21",
            "pickupTime": "9:40 PM",
            "stairs": 7,
            "items": [
                {
                    "id": "item261",
                    "name": "Sofa",
                    "weight": 15,
                    "quantity": 4
                },
                {
                    "id": "item262",
                    "name": "Box",
                    "weight": 49,
                    "quantity": 1
                }
            ]
        },
        "personalDetails": {
            "firstname": "John",
            "lastname": "Doe",
            "email": "user26@example.com",
            "mobile": "0885916515",
            "message": "Handle with care"
        },
        "costs": {
            "callOutFee": 54,
            "timeFee": 37,
            "fuelFee": 18,
            "massFee": 34,
            "itemFee": 27,
            "stairFee": 350,
            "total": 520,
            "timeNum": 3
        },
        "tripDetails": {
            "distance": "30 km",
            "duration": "96 mins"
        },
        "driver": false,
        "driverId": "driver8",
        "userId": "user26",
        "userPaid": false,
        "driverPaid": true
    },
    {
        id: "sdmdmvmsmdmm",
        "status": "out-for-pickup",
        "paymentMethod": "Credit Card",
        "addressDetails": {
            "pickup": "72 Main St, City 27",
            "dropoff": "28 Park Ave, City 28"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-20",
            "pickupTime": "10:54 PM",
            "stairs": 2,
            "items": [
                {
                    "id": "item271",
                    "name": "Sofa",
                    "weight": 10,
                    "quantity": 1
                }
            ]
        },
        "personalDetails": {
            "firstname": "Jane",
            "lastname": "Smith",
            "email": "user27@example.com",
            "mobile": "0816291348",
            "message": ""
        },
        "costs": {
            "callOutFee": 51,
            "timeFee": 54,
            "fuelFee": 48,
            "massFee": 25,
            "itemFee": 29,
            "stairFee": 100,
            "total": 307,
            "timeNum": 4
        },
        "tripDetails": {
            "distance": "20 km",
            "duration": "88 mins"
        },
        "driver": false,
        "driverId": null,
        "userId": "user27",
        "userPaid": true,
        "driverPaid": false
    },
    {
        id: "12dewcwcsdc",
        "status": "order-placed",
        "paymentMethod": "Cash",
        "addressDetails": {
            "pickup": "20 Main St, City 28",
            "dropoff": "14 Park Ave, City 29"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-18",
            "pickupTime": "12:03 AM",
            "stairs": 7,
            "items": [
                {
                    "id": "item281",
                    "name": "Desk",
                    "weight": 14,
                    "quantity": 3
                },
                {
                    "id": "item282",
                    "name": "Chair",
                    "weight": 8,
                    "quantity": 5
                }
            ]
        },
        "personalDetails": {
            "firstname": "Alice",
            "lastname": "Brown",
            "email": "user28@example.com",
            "mobile": "0879430085",
            "message": "Please call on arrival"
        },
        "costs": {
            "callOutFee": 64,
            "timeFee": 60,
            "fuelFee": 39,
            "massFee": 18,
            "itemFee": 13,
            "stairFee": 350,
            "total": 544,
            "timeNum": 4
        },
        "tripDetails": {
            "distance": "7 km",
            "duration": "39 mins"
        },
        "driver": false,
        "driverId": null,
        "userId": "user28",
        "userPaid": false,
        "driverPaid": false
    },
    {
        id: "lormmerm444",
        "status": "out-for-dropoff",
        "paymentMethod": "Cash",
        "addressDetails": {
            "pickup": "10 Main St, City 29",
            "dropoff": "58 Park Ave, City 30"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-21",
            "pickupTime": "16:57 AM",
            "stairs": 1,
            "items": [
                {
                    "id": "item291",
                    "name": "Fridge",
                    "weight": 46,
                    "quantity": 2
                }
            ]
        },
        "personalDetails": {
            "firstname": "Bob",
            "lastname": "Johnson",
            "email": "user29@example.com",
            "mobile": "0879818592",
            "message": ""
        },
        "costs": {
            "callOutFee": 83,
            "timeFee": 38,
            "fuelFee": 28,
            "massFee": 24,
            "itemFee": 24,
            "stairFee": 50,
            "total": 247,
            "timeNum": 2
        },
        "tripDetails": {
            "distance": "5 km",
            "duration": "25 mins"
        },
        "driver": true,
        "driverId": null,
        "userId": "user29",
        "userPaid": true,
        "driverPaid": false
    },
    {
        id: "mvsdvdssss2222",
        "status": "out-for-dropoff",
        "paymentMethod": "Credit Card",
        "addressDetails": {
            "pickup": "92 Main St, City 30",
            "dropoff": "68 Park Ave, City 31"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-25",
            "pickupTime": "15:01 PM",
            "stairs": 6,
            "items": [
                {
                    "id": "item301",
                    "name": "Microwave",
                    "weight": 34,
                    "quantity": 2
                },
                {
                    "id": "item302",
                    "name": "Fridge",
                    "weight": 12,
                    "quantity": 3
                }
            ]
        },
        "personalDetails": {
            "firstname": "Charlie",
            "lastname": "Davis",
            "email": "user30@example.com",
            "mobile": "0821690199",
            "message": ""
        },
        "costs": {
            "callOutFee": 68,
            "timeFee": 44,
            "fuelFee": 26,
            "massFee": 39,
            "itemFee": 26,
            "stairFee": 300,
            "total": 503,
            "timeNum": 1
        },
        "tripDetails": {
            "distance": "49 km",
            "duration": "53 mins"
        },
        "driver": false,
        "driverId": "driver4",
        "userId": "user30",
        "userPaid": false,
        "driverPaid": true
    },
    {
        id: "2wxxccsds",
        "status": "completed",
        "paymentMethod": "EFT",
        "addressDetails": {
            "pickup": "96 Main St, City 31",
            "dropoff": "30 Park Ave, City 32"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-19",
            "pickupTime": "14:47 PM",
            "stairs": 7,
            "items": [
                {
                    "id": "item311",
                    "name": "Sofa",
                    "weight": 46,
                    "quantity": 4
                }
            ]
        },
        "personalDetails": {
            "firstname": "John",
            "lastname": "Doe",
            "email": "user31@example.com",
            "mobile": "0830341716",
            "message": ""
        },
        "costs": {
            "callOutFee": 98,
            "timeFee": 45,
            "fuelFee": 24,
            "massFee": 38,
            "itemFee": 18,
            "stairFee": 350,
            "total": 573,
            "timeNum": 2
        },
        "tripDetails": {
            "distance": "35 km",
            "duration": "87 mins"
        },
        "driver": false,
        "driverId": null,
        "userId": "user31",
        "userPaid": true,
        "driverPaid": false
    },
    {
        id: "vmmmsmdc",
        "status": "completed",
        "paymentMethod": "Credit Card",
        "addressDetails": {
            "pickup": "80 Main St, City 32",
            "dropoff": "86 Park Ave, City 33"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-21",
            "pickupTime": "16:25 PM",
            "stairs": 12,
            "items": [
                {
                    "id": "item321",
                    "name": "Desk",
                    "weight": 50,
                    "quantity": 3
                }
            ]
        },
        "personalDetails": {
            "firstname": "Jane",
            "lastname": "Smith",
            "email": "user32@example.com",
            "mobile": "0823045216",
            "message": ""
        },
        "costs": {
            "callOutFee": 61,
            "timeFee": 48,
            "fuelFee": 48,
            "massFee": 18,
            "itemFee": 29,
            "stairFee": 600,
            "total": 804,
            "timeNum": 2
        },
        "tripDetails": {
            "distance": "36 km",
            "duration": "98 mins"
        },
        "driver": true,
        "driverId": "driver5",
        "userId": "user32",
        "userPaid": true,
        "driverPaid": false
    },
    {
        id: "vsldlllll3",
        "status": "out-for-dropoff",
        "paymentMethod": "Credit Card",
        "addressDetails": {
            "pickup": "89 Main St, City 33",
            "dropoff": "70 Park Ave, City 34"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-25",
            "pickupTime": "9:05 AM",
            "stairs": 4,
            "items": [
                {
                    "id": "item331",
                    "name": "Chair",
                    "weight": 5,
                    "quantity": 2
                }
            ]
        },
        "personalDetails": {
            "firstname": "Alice",
            "lastname": "Brown",
            "email": "user33@example.com",
            "mobile": "0853385623",
            "message": "Please call on arrival"
        },
        "costs": {
            "callOutFee": 75,
            "timeFee": 31,
            "fuelFee": 20,
            "massFee": 24,
            "itemFee": 19,
            "stairFee": 200,
            "total": 369,
            "timeNum": 5
        },
        "tripDetails": {
            "distance": "6 km",
            "duration": "56 mins"
        },
        "driver": true,
        "driverId": "driver3",
        "userId": "user33",
        "userPaid": true,
        "driverPaid": true
    },
    {
        id: "dvsdsdv3222",
        "status": "out-for-dropoff",
        "paymentMethod": "EFT",
        "addressDetails": {
            "pickup": "27 Main St, City 34",
            "dropoff": "31 Park Ave, City 35"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-22",
            "pickupTime": "12:30 AM",
            "stairs": 8,
            "items": [
                {
                    "id": "item341",
                    "name": "Microwave",
                    "weight": 44,
                    "quantity": 2
                },
                {
                    "id": "item342",
                    "name": "Fridge",
                    "weight": 3,
                    "quantity": 2
                }
            ]
        },
        "personalDetails": {
            "firstname": "Bob",
            "lastname": "Johnson",
            "email": "user34@example.com",
            "mobile": "0810050676",
            "message": "Fragile"
        },
        "costs": {
            "callOutFee": 75,
            "timeFee": 45,
            "fuelFee": 39,
            "massFee": 29,
            "itemFee": 11,
            "stairFee": 400,
            "total": 599,
            "timeNum": 4
        },
        "tripDetails": {
            "distance": "32 km",
            "duration": "97 mins"
        },
        "driver": false,
        "driverId": "driver2",
        "userId": "user34",
        "userPaid": true,
        "driverPaid": false
    },
    {
        id: "12e1dwe",
        "status": "completed",
        "paymentMethod": "Credit Card",
        "addressDetails": {
            "pickup": "55 Main St, City 35",
            "dropoff": "69 Park Ave, City 36"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-21",
            "pickupTime": "16:20 PM",
            "stairs": 11,
            "items": [
                {
                    "id": "item351",
                    "name": "Desk",
                    "weight": 8,
                    "quantity": 3
                }
            ]
        },
        "personalDetails": {
            "firstname": "Charlie",
            "lastname": "Davis",
            "email": "user35@example.com",
            "mobile": "0814508346",
            "message": "Please call on arrival"
        },
        "costs": {
            "callOutFee": 83,
            "timeFee": 49,
            "fuelFee": 15,
            "massFee": 31,
            "itemFee": 29,
            "stairFee": 550,
            "total": 757,
            "timeNum": 3
        },
        "tripDetails": {
            "distance": "49 km",
            "duration": "113 mins"
        },
        "driver": true,
        "driverId": "driver9",
        "userId": "user35",
        "userPaid": false,
        "driverPaid": false
    },
    {
        id: "sdsdvsd3442",
        "status": "completed",
        "paymentMethod": "Credit Card",
        "addressDetails": {
            "pickup": "60 Main St, City 36",
            "dropoff": "34 Park Ave, City 37"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-19",
            "pickupTime": "11:14 AM",
            "stairs": 12,
            "items": [
                {
                    "id": "item361",
                    "name": "Microwave",
                    "weight": 21,
                    "quantity": 4
                },
                {
                    "id": "item362",
                    "name": "Fridge",
                    "weight": 22,
                    "quantity": 1
                }
            ]
        },
        "personalDetails": {
            "firstname": "John",
            "lastname": "Doe",
            "email": "user36@example.com",
            "mobile": "0890839822",
            "message": ""
        },
        "costs": {
            "callOutFee": 92,
            "timeFee": 38,
            "fuelFee": 21,
            "massFee": 19,
            "itemFee": 12,
            "stairFee": 600,
            "total": 782,
            "timeNum": 3
        },
        "tripDetails": {
            "distance": "49 km",
            "duration": "28 mins"
        },
        "driver": true,
        "driverId": "driver6",
        "userId": "user36",
        "userPaid": true,
        "driverPaid": false
    },
    {
        id: "ascmsmsd2323",
        "status": "order-placed",
        "paymentMethod": "Credit Card",
        "addressDetails": {
            "pickup": "6 Main St, City 37",
            "dropoff": "79 Park Ave, City 38"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-19",
            "pickupTime": "8:16 AM",
            "stairs": 11,
            "items": [
                {
                    "id": "item371",
                    "name": "Chair",
                    "weight": 48,
                    "quantity": 4
                }
            ]
        },
        "personalDetails": {
            "firstname": "Jane",
            "lastname": "Smith",
            "email": "user37@example.com",
            "mobile": "0889830273",
            "message": ""
        },
        "costs": {
            "callOutFee": 95,
            "timeFee": 23,
            "fuelFee": 34,
            "massFee": 15,
            "itemFee": 30,
            "stairFee": 550,
            "total": 747,
            "timeNum": 2
        },
        "tripDetails": {
            "distance": "9 km",
            "duration": "96 mins"
        },
        "driver": true,
        "driverId": null,
        "userId": "user37",
        "userPaid": false,
        "driverPaid": true
    },
    {
        id: "mmlsd4345",
        "status": "completed",
        "paymentMethod": "Cash",
        "addressDetails": {
            "pickup": "91 Main St, City 38",
            "dropoff": "30 Park Ave, City 39"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-25",
            "pickupTime": "16:29 AM",
            "stairs": 11,
            "items": [
                {
                    "id": "item381",
                    "name": "Box",
                    "weight": 48,
                    "quantity": 2
                },
                {
                    "id": "item382",
                    "name": "Fridge",
                    "weight": 44,
                    "quantity": 5
                },
                {
                    "id": "item383",
                    "name": "Fridge",
                    "weight": 42,
                    "quantity": 1
                }
            ]
        },
        "personalDetails": {
            "firstname": "Alice",
            "lastname": "Brown",
            "email": "user38@example.com",
            "mobile": "0817022107",
            "message": ""
        },
        "costs": {
            "callOutFee": 76,
            "timeFee": 43,
            "fuelFee": 45,
            "massFee": 28,
            "itemFee": 16,
            "stairFee": 550,
            "total": 758,
            "timeNum": 5
        },
        "tripDetails": {
            "distance": "49 km",
            "duration": "76 mins"
        },
        "driver": false,
        "driverId": null,
        "userId": "user38",
        "userPaid": false,
        "driverPaid": false
    },
    {
        id: "dsdvcscsdc",
        "status": "order-placed",
        "paymentMethod": "Cash",
        "addressDetails": {
            "pickup": "17 Main St, City 39",
            "dropoff": "13 Park Ave, City 40"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-21",
            "pickupTime": "12:40 PM",
            "stairs": 3,
            "items": [
                {
                    "id": "item391",
                    "name": "Desk",
                    "weight": 46,
                    "quantity": 5
                },
                {
                    "id": "item392",
                    "name": "Box",
                    "weight": 24,
                    "quantity": 4
                },
                {
                    "id": "item393",
                    "name": "Chair",
                    "weight": 50,
                    "quantity": 3
                }
            ]
        },
        "personalDetails": {
            "firstname": "Bob",
            "lastname": "Johnson",
            "email": "user39@example.com",
            "mobile": "0822188823",
            "message": "Fragile"
        },
        "costs": {
            "callOutFee": 63,
            "timeFee": 42,
            "fuelFee": 27,
            "massFee": 38,
            "itemFee": 24,
            "stairFee": 150,
            "total": 344,
            "timeNum": 3
        },
        "tripDetails": {
            "distance": "28 km",
            "duration": "80 mins"
        },
        "driver": true,
        "driverId": "driver7",
        "userId": "user39",
        "userPaid": false,
        "driverPaid": true
    },
    {
        id: "dsdvserergf",
        "status": "out-for-dropoff",
        "paymentMethod": "Cash",
        "addressDetails": {
            "pickup": "71 Main St, City 40",
            "dropoff": "1 Park Ave, City 41"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-25",
            "pickupTime": "13:18 AM",
            "stairs": 7,
            "items": [
                {
                    "id": "item401",
                    "name": "Chair",
                    "weight": 20,
                    "quantity": 5
                }
            ]
        },
        "personalDetails": {
            "firstname": "Charlie",
            "lastname": "Davis",
            "email": "user40@example.com",
            "mobile": "0825763615",
            "message": ""
        },
        "costs": {
            "callOutFee": 91,
            "timeFee": 31,
            "fuelFee": 42,
            "massFee": 16,
            "itemFee": 29,
            "stairFee": 350,
            "total": 559,
            "timeNum": 1
        },
        "tripDetails": {
            "distance": "15 km",
            "duration": "37 mins"
        },
        "driver": false,
        "driverId": "driver2",
        "userId": "user40",
        "userPaid": true,
        "driverPaid": true
    },
    {
        id: "mldsovopdvsd",
        "status": "out-for-pickup",
        "paymentMethod": "Cash",
        "addressDetails": {
            "pickup": "39 Main St, City 41",
            "dropoff": "92 Park Ave, City 42"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-19",
            "pickupTime": "17:42 AM",
            "stairs": 8,
            "items": [
                {
                    "id": "item411",
                    "name": "Fridge",
                    "weight": 28,
                    "quantity": 3
                }
            ]
        },
        "personalDetails": {
            "firstname": "John",
            "lastname": "Doe",
            "email": "user41@example.com",
            "mobile": "0873717974",
            "message": "Please call on arrival"
        },
        "costs": {
            "callOutFee": 58,
            "timeFee": 55,
            "fuelFee": 15,
            "massFee": 14,
            "itemFee": 27,
            "stairFee": 400,
            "total": 569,
            "timeNum": 4
        },
        "tripDetails": {
            "distance": "26 km",
            "duration": "114 mins"
        },
        "driver": false,
        "driverId": "driver4",
        "userId": "user41",
        "userPaid": false,
        "driverPaid": true
    },
    {
        id: "32r030j4f",
        "status": "completed",
        "paymentMethod": "Cash",
        "addressDetails": {
            "pickup": "40 Main St, City 42",
            "dropoff": "56 Park Ave, City 43"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-20",
            "pickupTime": "11:47 AM",
            "stairs": 1,
            "items": [
                {
                    "id": "item421",
                    "name": "Desk",
                    "weight": 25,
                    "quantity": 5
                }
            ]
        },
        "personalDetails": {
            "firstname": "Jane",
            "lastname": "Smith",
            "email": "user42@example.com",
            "mobile": "0875257536",
            "message": "Fragile"
        },
        "costs": {
            "callOutFee": 72,
            "timeFee": 33,
            "fuelFee": 16,
            "massFee": 27,
            "itemFee": 18,
            "stairFee": 50,
            "total": 216,
            "timeNum": 2
        },
        "tripDetails": {
            "distance": "47 km",
            "duration": "24 mins"
        },
        "driver": false,
        "driverId": null,
        "userId": "user42",
        "userPaid": true,
        "driverPaid": true
    },
    {
        id: "dssd-lsd323",
        "status": "order-placed",
        "paymentMethod": "Credit Card",
        "addressDetails": {
            "pickup": "71 Main St, City 43",
            "dropoff": "12 Park Ave, City 44"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-19",
            "pickupTime": "11:00 AM",
            "stairs": 7,
            "items": [
                {
                    "id": "item431",
                    "name": "Desk",
                    "weight": 25,
                    "quantity": 3
                },
                {
                    "id": "item432",
                    "name": "Box",
                    "weight": 45,
                    "quantity": 2
                },
                {
                    "id": "item433",
                    "name": "Chair",
                    "weight": 42,
                    "quantity": 5
                }
            ]
        },
        "personalDetails": {
            "firstname": "Alice",
            "lastname": "Brown",
            "email": "user43@example.com",
            "mobile": "0826309956",
            "message": ""
        },
        "costs": {
            "callOutFee": 68,
            "timeFee": 49,
            "fuelFee": 40,
            "massFee": 39,
            "itemFee": 15,
            "stairFee": 350,
            "total": 561,
            "timeNum": 4
        },
        "tripDetails": {
            "distance": "27 km",
            "duration": "35 mins"
        },
        "driver": true,
        "driverId": "driver7",
        "userId": "user43",
        "userPaid": true,
        "driverPaid": false
    },
    {
        id: "dvsmsdk-32432",
        "status": "out-for-dropoff",
        "paymentMethod": "Credit Card",
        "addressDetails": {
            "pickup": "92 Main St, City 44",
            "dropoff": "53 Park Ave, City 45"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-21",
            "pickupTime": "10:48 AM",
            "stairs": 2,
            "items": [
                {
                    "id": "item441",
                    "name": "Chair",
                    "weight": 12,
                    "quantity": 5
                },
                {
                    "id": "item442",
                    "name": "Sofa",
                    "weight": 46,
                    "quantity": 3
                },
                {
                    "id": "item443",
                    "name": "Microwave",
                    "weight": 37,
                    "quantity": 1
                }
            ]
        },
        "personalDetails": {
            "firstname": "Bob",
            "lastname": "Johnson",
            "email": "user44@example.com",
            "mobile": "0875334835",
            "message": ""
        },
        "costs": {
            "callOutFee": 65,
            "timeFee": 44,
            "fuelFee": 29,
            "massFee": 35,
            "itemFee": 12,
            "stairFee": 100,
            "total": 285,
            "timeNum": 5
        },
        "tripDetails": {
            "distance": "40 km",
            "duration": "78 mins"
        },
        "driver": false,
        "driverId": "driver8",
        "userId": "user44",
        "userPaid": false,
        "driverPaid": false
    },
    {
        id: "3323feeeeeeeeeee",
        "status": "out-for-pickup",
        "paymentMethod": "Cash",
        "addressDetails": {
            "pickup": "64 Main St, City 45",
            "dropoff": "3 Park Ave, City 46"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-22",
            "pickupTime": "14:12 PM",
            "stairs": 10,
            "items": [
                {
                    "id": "item451",
                    "name": "Chair",
                    "weight": 17,
                    "quantity": 3
                },
                {
                    "id": "item452",
                    "name": "Chair",
                    "weight": 21,
                    "quantity": 5
                },
                {
                    "id": "item453",
                    "name": "Fridge",
                    "weight": 9,
                    "quantity": 4
                }
            ]
        },
        "personalDetails": {
            "firstname": "Charlie",
            "lastname": "Davis",
            "email": "user45@example.com",
            "mobile": "0871320526",
            "message": "Handle with care"
        },
        "costs": {
            "callOutFee": 72,
            "timeFee": 41,
            "fuelFee": 46,
            "massFee": 40,
            "itemFee": 29,
            "stairFee": 500,
            "total": 728,
            "timeNum": 1
        },
        "tripDetails": {
            "distance": "22 km",
            "duration": "16 mins"
        },
        "driver": false,
        "driverId": "driver7",
        "userId": "user45",
        "userPaid": false,
        "driverPaid": true
    },
    {
        id: "0023032fr",
        "status": "order-placed",
        "paymentMethod": "Cash",
        "addressDetails": {
            "pickup": "98 Main St, City 46",
            "dropoff": "16 Park Ave, City 47"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-24",
            "pickupTime": "8:19 PM",
            "stairs": 1,
            "items": [
                {
                    "id": "item461",
                    "name": "Desk",
                    "weight": 9,
                    "quantity": 1
                },
                {
                    "id": "item462",
                    "name": "Sofa",
                    "weight": 18,
                    "quantity": 5
                },
                {
                    "id": "item463",
                    "name": "Chair",
                    "weight": 18,
                    "quantity": 1
                }
            ]
        },
        "personalDetails": {
            "firstname": "John",
            "lastname": "Doe",
            "email": "user46@example.com",
            "mobile": "0826684609",
            "message": ""
        },
        "costs": {
            "callOutFee": 64,
            "timeFee": 22,
            "fuelFee": 35,
            "massFee": 26,
            "itemFee": 18,
            "stairFee": 50,
            "total": 215,
            "timeNum": 2
        },
        "tripDetails": {
            "distance": "22 km",
            "duration": "90 mins"
        },
        "driver": true,
        "driverId": "driver1",
        "userId": "user46",
        "userPaid": false,
        "driverPaid": false
    },
    {
        id: "mvlsd0wd",
        "status": "order-placed",
        "paymentMethod": "EFT",
        "addressDetails": {
            "pickup": "92 Main St, City 47",
            "dropoff": "45 Park Ave, City 48"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-20",
            "pickupTime": "14:54 AM",
            "stairs": 3,
            "items": [
                {
                    "id": "item471",
                    "name": "Desk",
                    "weight": 16,
                    "quantity": 5
                },
                {
                    "id": "item472",
                    "name": "Box",
                    "weight": 7,
                    "quantity": 5
                },
                {
                    "id": "item473",
                    "name": "Chair",
                    "weight": 28,
                    "quantity": 1
                }
            ]
        },
        "personalDetails": {
            "firstname": "Jane",
            "lastname": "Smith",
            "email": "user47@example.com",
            "mobile": "0873681438",
            "message": ""
        },
        "costs": {
            "callOutFee": 59,
            "timeFee": 26,
            "fuelFee": 48,
            "massFee": 29,
            "itemFee": 29,
            "stairFee": 150,
            "total": 341,
            "timeNum": 3
        },
        "tripDetails": {
            "distance": "17 km",
            "duration": "60 mins"
        },
        "driver": true,
        "driverId": "driver1",
        "userId": "user47",
        "userPaid": true,
        "driverPaid": false
    },
    {
        id: "vsdvsd00sdc",
        "status": "out-for-pickup",
        "paymentMethod": "Credit Card",
        "addressDetails": {
            "pickup": "66 Main St, City 48",
            "dropoff": "14 Park Ave, City 49"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-18",
            "pickupTime": "12:27 AM",
            "stairs": 11,
            "items": [
                {
                    "id": "item481",
                    "name": "Box",
                    "weight": 49,
                    "quantity": 2
                },
                {
                    "id": "item482",
                    "name": "Sofa",
                    "weight": 42,
                    "quantity": 2
                }
            ]
        },
        "personalDetails": {
            "firstname": "Alice",
            "lastname": "Brown",
            "email": "user48@example.com",
            "mobile": "0829288596",
            "message": "Handle with care"
        },
        "costs": {
            "callOutFee": 58,
            "timeFee": 21,
            "fuelFee": 47,
            "massFee": 15,
            "itemFee": 28,
            "stairFee": 550,
            "total": 719,
            "timeNum": 1
        },
        "tripDetails": {
            "distance": "44 km",
            "duration": "118 mins"
        },
        "driver": true,
        "driverId": "driver8",
        "userId": "user48",
        "userPaid": false,
        "driverPaid": false
    },
    {
        id: "32gveav",
        "status": "order-placed",
        "paymentMethod": "Credit Card",
        "addressDetails": {
            "pickup": "85 Main St, City 49",
            "dropoff": "22 Park Ave, City 50"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-21",
            "pickupTime": "8:05 PM",
            "stairs": 8,
            "items": [
                {
                    "id": "item491",
                    "name": "Desk",
                    "weight": 25,
                    "quantity": 3
                },
                {
                    "id": "item492",
                    "name": "Sofa",
                    "weight": 10,
                    "quantity": 3
                }
            ]
        },
        "personalDetails": {
            "firstname": "Bob",
            "lastname": "Johnson",
            "email": "user49@example.com",
            "mobile": "0891026834",
            "message": ""
        },
        "costs": {
            "callOutFee": 50,
            "timeFee": 53,
            "fuelFee": 32,
            "massFee": 30,
            "itemFee": 16,
            "stairFee": 400,
            "total": 581,
            "timeNum": 2
        },
        "tripDetails": {
            "distance": "45 km",
            "duration": "20 mins"
        },
        "driver": false,
        "driverId": "driver8",
        "userId": "user49",
        "userPaid": true,
        "driverPaid": true
    },
    {
        id: "2f43fdvs",
        "status": "out-for-pickup",
        "paymentMethod": "Credit Card",
        "addressDetails": {
            "pickup": "81 Main St, City 50",
            "dropoff": "35 Park Ave, City 51"
        },
        "deliveryDetails": {
            "pickupDate": "2025-09-23",
            "pickupTime": "14:17 PM",
            "stairs": 8,
            "items": [
                {
                    "id": "item501",
                    "name": "Sofa",
                    "weight": 39,
                    "quantity": 1
                },
                {
                    "id": "item502",
                    "name": "Chair",
                    "weight": 26,
                    "quantity": 4
                },
                {
                    "id": "item503",
                    "name": "Desk",
                    "weight": 13,
                    "quantity": 1
                }
            ]
        },
        "personalDetails": {
            "firstname": "Charlie",
            "lastname": "Davis",
            "email": "user50@example.com",
            "mobile": "0856384211",
            "message": "Handle with care"
        },
        "costs": {
            "callOutFee": 63,
            "timeFee": 36,
            "fuelFee": 22,
            "massFee": 12,
            "itemFee": 27,
            "stairFee": 400,
            "total": 560,
            "timeNum": 4
        },
        "tripDetails": {
            "distance": "36 km",
            "duration": "23 mins"
        },
        "driver": true,
        "driverId": null,
        "userId": "user50",
        "userPaid": false,
        "driverPaid": true
    }
]