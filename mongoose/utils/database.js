const mongoose = require('mongoose');
require('dotenv').config();
const mongoUrl = process.env.MONGO_URL;
const connectDB = async () => {
    try {
        await mongoose.connect(mongoUrl);
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("DB Connection Failed", err.message);
    }
};

module.exports = connectDB;