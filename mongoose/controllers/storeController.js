const House = require('../models/houses');
const express = require('express');
const app = express();
const db = require('../utils/database');

app.use(express.urlencoded({ extended: true }));

exports.showData = async (req, res) => {
    try {
        const houses = await House.find()
        res.render('store/index', { data: houses, title: "Home" });
    } catch (err) {
        res.status(500).render('404', { title: "Data Not Found" });
        console.log("Error while rendering Data");
    }
}

exports.getHousesList = async (req, res) => {
    try {
        const houses = await House.find()
        res.render('store/houses-list', { data: houses, title: "Home" });
    } catch (err) {
        res.status(500).render('404', { title: "Data Not Found" });
        console.log("Error while rendering Data");
    }

}

exports.getBookings = (req, res) => {
    res.render('store/bookings', { title: "Bookings" })
}

exports.getDetails = async (req, res) => {
    try {
        const house = await House.findOne({ houseId: req.params.houseId });
        if (!house) {
            return res.status(404).render('404', { title: "House Not Found" })
        }
        res.render('store/details', { title: "Details", data: house });
    } catch (err) {
        console.log("Error while rendering Detail Page");
    };
};

exports.getFavourites = async (req, res) => {
    try {
        const favourites = await House.find({ isFavourite: true })
        res.render('store/favourites', { data: favourites, title: "Favourites" });
    } catch (err) {
        console.log("Error while rendering Data");
        res.status(500).send("Error fetching favourites");
    };
};

exports.toggleFavourite = async (req, res) => {
    const { houseId } = req.body;
    try {
        const house = await House.findOneAndUpdate(
            {houseId},
            { $bit: { isFavourite: { xor: 1 } } },
            { new: true });
        if (!house) {
            return res.status(404).render('404', { title: "House Not Found" })
        }
        res.redirect(req.get('referer') || '/')
    }
    catch (err) {
        console.log("Error while updating favourite:");
        res.status(500).send("Database error");
    };
};
