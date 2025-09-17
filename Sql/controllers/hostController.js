const registeredHouse = require('../models/houses');
const db = require('../utils/database');

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
    registeredHouse.fetch().then(([houses]) => {
        res.render('host/host-houses-list', { data: houses, title: "Home" });
    })
}

exports.deleteHome = (req, res) => {
    let { houseId } = req.body;
    db.execute("DELETE FROM houses where houseId=?", [houseId])
    db.execute("DELETE FROM houses WHERE houseId = ?", [houseId])
        .then(() => {
            return registeredHouse.fetch();
        })
        .then(([houses]) => {
            res.render('host/host-houses-list', { title: "Homes", data: houses });
        })
        .catch(err => {
            console.error("Error while deleting house:", err);
            res.status(500).send("Error deleting house");
        });
}

exports.editHome = (req, res) => {
    let { houseId } = req.body;
    registeredHouse.fetch().then(([houses]) => {
        let findHouse = houses.find(x => x.houseId == houseId);
        res.render('host/editHouse', { title: "Edit", data: findHouse });
    }).catch(() => {
        console.log("failed while editing home")
    })

};

exports.editSuccessfully = (req, res) => {
    let { houseId, fullName, houseCity, housePrice, houseRooms, houseImg } = req.body;
    db.execute(
        "UPDATE houses SET fullName=?, houseCity=?, housePrice=?, houseRooms=?, houseImg=? WHERE houseId=?",
        [fullName, houseCity, housePrice, houseRooms, houseImg, houseId]
    )
    .then(() => {
         res.render('host/editSuccessfully', { title: "Edit Done" });
    })
    .catch(err => {
        console.log("Error while updating the data....", err);
        res.status(500).send("Error updating data");
    });
};

