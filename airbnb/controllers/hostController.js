const registeredHouse = require('../models/houses');
const fs = require('fs');
const path=require('path');
const rootDir=require('../utils/pathUtils');
exports.rentHouse = (req, res) => {
    res.render('host/rentHome', { title: "Rent-House" })
}

exports.thankUser = (req, res) => {
    const house = new registeredHouse(req.body.fullName, req.body.houseCity, req.body.housePrice, req.body.houseRooms, req.body.houseImg)
    house.save()
    let name = req.body.fullName
    res.render('host/thankYou', { name, title: "ThankYou" });
}

exports.hostHomes = (req, res) => {
    registeredHouse.fetch((houses) => {
        res.render('host/host-houses-list', { data: houses, title: "Home" });
    })
}

exports.deleteHome = (req, res) => {
    registeredHouse.fetch((houses) => {
        let { houseId } = req.body;
        // console.log(houseId)
        let findHouses = houses.filter(x => x.houseId != houseId);
        console.log(findHouses)
        const housesDataPath = path.join(rootDir, 'data', 'houses.json');
        fs.writeFile(housesDataPath,JSON.stringify(findHouses),(err)=>{
            if(err){
                console.log("Error while deleting");
            }
                res.render('host/host-houses-list', { title: "Homes", data: findHouses })
            
        })
    })
}
