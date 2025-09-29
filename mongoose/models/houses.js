const mongoose=require('mongoose');
const crypto = require('crypto');

const houseSchema = new mongoose.Schema({
    fullName: String,
    houseCity: String,
    housePrice: Number,
    houseRooms: Number,
    houseImg: String,
    houseId: { type: String, default: () => crypto.randomUUID(), },
})

const House = mongoose.model("houses", houseSchema);
module.exports = House;