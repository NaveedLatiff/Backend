const crypto = require('crypto');
const { getdb } = require('../utils/database');
const registeredHouse = class House {
    constructor(fullName, houseCity, housePrice, houseRooms, houseImg, houseId) {
        this.fullName = fullName;
        this.houseCity = houseCity;
        this.housePrice = housePrice;
        this.houseRooms = houseRooms;
        this.houseImg = houseImg;
        this.houseId = crypto.randomUUID();
        this.isFavourite = false;
    };
    save() {
        const db = getdb()
        return db.collection("houses").insertOne(this)
    };

    static fetch() {
        const db = getdb();
        return db.collection("houses").find().toArray();
    };

    static fetchFavourites() {
        const db = getdb();
        return db.collection("houses").find({ isFavourite: true }).toArray();
    };

    static findById(houseId) {
        const db = getdb();
        return db.collection("houses").findOne({ houseId });
    };

    static updateOne(houseId, updateFields) {
        const db = getdb();
        return db.collection("houses").updateOne(
            { houseId },
            { $set: updateFields }
        )
    };

    static deleteOne(houseId) {
        const db = getdb();
        return db.collection("houses").deleteOne({ houseId });
    };
};

module.exports = registeredHouse;