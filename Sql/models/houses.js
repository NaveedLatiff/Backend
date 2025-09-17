const db=require('../utils/database');
const crypto = require('crypto');
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
         return db.execute(
            "INSERT INTO houses (houseId, fullName, houseCity, housePrice, houseRooms, houseImg, isFavourite) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [this.houseId, this.fullName, this.houseCity, this.housePrice, this.houseRooms, this.houseImg, this.isFavourite]
        );
    };

    static fetch() {
        return db.execute("SELECT * FROM houses");
    };

};

module.exports = registeredHouse;