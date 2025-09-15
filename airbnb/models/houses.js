const rootDir = require('../utils/pathUtils');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const registeredHouse = class House {
    constructor(fullName, houseCity, housePrice, houseRooms, houseImg, houseId) {
        this.houseId = crypto.randomUUID();
        this.fullName = fullName;
        this.houseCity = houseCity;
        this.housePrice = housePrice;
        this.houseRooms = houseRooms;
        this.houseImg = houseImg;
        this.houseId = houseId;
        this.isFavourite=false;
    };
    save() {
        const housesDataPath = path.join(rootDir, 'data', 'houses.json');
        House.fetch((houses) => {
            houses.unshift({ ...this, houseId: crypto.randomUUID()  });
            fs.writeFile(housesDataPath, JSON.stringify(houses), (err) => {
                if (err) {
                    console.log("File Write Error:", err);
                }
            });
        });
    };

    static fetch(callback) {
        const housesDataPath = path.join(rootDir, 'data', 'houses.json');
        fs.readFile(housesDataPath, (err, data) => {
            if (err) {
                callback([]);
            } else {
                callback(JSON.parse(data))
            }
        });

    };

};

module.exports = registeredHouse;