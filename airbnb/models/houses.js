const data = require('../utils/dataStore');

const registeredHouse = class House {
    constructor(fullName, houseCity, housePrice, houseRooms) {
        this.fullName = fullName;
        this.houseCity = houseCity;
        this.housePrice = housePrice;
        this.houseRooms = houseRooms;
    };
    save() {
        data.unshift({...this});
    }

    static fetch(){
        return data
    }

};

module.exports = registeredHouse;