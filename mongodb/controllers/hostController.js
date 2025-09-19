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
    registeredHouse.fetch().then((houses) => {
        res.render('host/host-houses-list', { data: houses, title: "Home" });
    })
}

exports.deleteHome = async (req, res) => {
    let { houseId } = req.body;
    try {
        const house = await registeredHouse.findById(houseId);
        if (!house) {
            return res.status(404).render("404", { title: "House Not Found" });
        }

        await registeredHouse.deleteOne(houseId);
        const houses = await registeredHouse.fetch();
        res.render("host/host-houses-list", { data: houses, title: "Home" });
    }
    catch (err) {
        console.error("Error while deleting house:", err);
        res.status(500).send("Error deleting house");
    };
}

exports.editHome = async (req, res) => {
    let { houseId } = req.body;
    try {
        let house = await registeredHouse.findById(houseId)
        if (!house) {
            return res.status(404).render('404', { title: "House Not Found" })
        }
        res.render('host/editHouse', { title: "Edit", data: house });
    }
    catch (err) {
        console.log("failed while editing home", err)
    }
};

exports.editSuccessfully = async (req, res) => {
    let { houseId, fullName, houseCity, housePrice, houseRooms, houseImg } = req.body;
    try {
        const house = await registeredHouse.findById(houseId);
        if (!house) {
            return res.status(404).render('404', { title: "House Not Found" })

        }
        await registeredHouse.updateOne(houseId,
            {
                fullName,
                houseCity,
                housePrice,
                houseRooms,
                houseImg
            })
        res.render('host/editSuccessfully', { title: "Edit Done" });
    }
    catch (err) {
        console.log("Error while updating the data....", err);
        res.status(500).send("Error updating data");
    };
};

