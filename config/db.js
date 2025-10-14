const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URL);
        console.log(`Connection to ${conn.connection.host} Succesful :)`);
    } catch (error) {
        console.log(`Something went wrong`);
        console.log(error);
    }
}

module.exports = connectDB;