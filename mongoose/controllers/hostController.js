const House = require('../models/houses')

exports.rentHouse = (req, res) => {
    res.render('host/rentHome', { title: "Rent-House" });
};

exports.thankUser = async (req, res) => {
    try {
        // console.log("Form Data:", req.body);
        const house = await House.create({
            fullName: req.body.fullName,
            houseCity: req.body.houseCity,
            housePrice: req.body.housePrice,
            houseRooms: req.body.houseRooms,
            houseImg: req.body.houseImg
        });
        res.render('host/thankYou', { name: house.fullName, title: "ThankYou" });
    } catch (err) {
        res.status(500).render("404", { title: "House Not Saved" });
    }
};

exports.hostHomes = async (req, res) => {
    try{
        const houses = await House.find()
        res.render('host/host-houses-list', { data: houses, title: "Home" });
    } catch (err) {
        res.status(500).render('404', { title: "Data Not Found" });
        console.log("Error while rendering Data");
    }
}

exports.deleteHome = async (req, res) => {
    let { houseId } = req.body;
    try {
        const house = await House.deleteOne({ houseId });

        const houses = await House.find();
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
        let house = await House.findOne({houseId})
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
        const house = await House.findOneAndUpdate(
            {houseId},
            {
                fullName,
                houseCity,
                housePrice,
                houseRooms,
                houseImg
            },
            {new:true}  
        );
        if (!house) {
            return res.status(404).render('404', { title: "House Not Found" })

        }
            res.render('host/editSuccessfully', { title: "Edit Done" });
    }
    catch (err) {
        console.log("Error while updating the data....", err);
        res.status(500).send("Error updating data");
    };
};

