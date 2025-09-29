const House = require('../models/houses');
const express = require('express');
const app = express();
const db = require('../utils/database');
const User = require('../models/auth')
const mongoose = require('mongoose');

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
        const houses = await House.find();

        let favourites = [];
        if (req.session.isLoggedIn) {
            const user = await User.findById(req.session.userId);
            if (user) {
                favourites = user.favourites;
                bookings=user.bookings;
            }
        }

        res.render('store/houses-list', {
            data: houses,
            favourites,
            bookings,
            title: "Home"
        });
    } catch (err) {
        res.status(500).render('404', { title: "Data Not Found" });
        console.log("Error while rendering Data:", err);
    }
};



exports.getDetails = async (req, res) => {
    try {
         const houses = await House.find()
        let favourites = [];
        if (req.session.isLoggedIn) {
            const user = await User.findById(req.session.userId);
            if (user) {
                favourites = user.favourites;
            }
        }
        const house = await House.findOne({ houseId: req.params.houseId });
        if (!house) {
            return res.status(404).render('404', { title: "House Not Found" })
        }
        res.render('store/details', { title: "Details", data: house,favourites });
    } catch (err) {
        console.log("Error while rendering Detail Page");
    };
};

exports.getFavourites = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.status(404).render("404", { title: "User Not Found" });
        }

        const houses = await House.find({ houseId: { $in: user.favourites } });

        res.render("store/favourites", {
            data: houses,
            favourites: user.favourites,
            title: "Favourites"
        });
    } catch (err) {
        console.log("Error while rendering favourites:", err);
        res.status(500).send("Error fetching favourites");
    }
};


exports.toggleFavourite = async (req, res) => {
    const { houseId } = req.body;
    const userId = req.session.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).render("404", { title: "User Not Found" });
        }

        const index = user.favourites.indexOf(houseId);

        if (index === -1) {
            user.favourites.push(houseId);
        } else {
            user.favourites.splice(index, 1);
        }

        await user.save();
        res.redirect(req.get("referer") || "/");
    } catch (err) {
        console.log("Error while updating favourite:", err);
        res.status(500).send("Database error");
    }
};

exports.getBookings = async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.status(404).render("404", { title: "User Not Found" });
        }

        const houses = await House.find({ houseId: { $in: user.bookings } });

        res.render("store/bookings", {
            data: houses,
            bookings: user.bookings,
            title: "Favourites"
        });
    } catch (err) {
        console.log("Error while rendering bookings:", err);
        res.status(500).send("Error fetching bookings");
    }
};

exports.toggleBooking = async (req, res) => {
    const { houseId } = req.body;
    const userId = req.session.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).render("404", { title: "User Not Found" });
        }

        const index=user.bookings.indexOf(houseId);

        if(index===-1){
            user.bookings.push(houseId);
        }else{
            user.bookings.splice(index,1);
        }

        await user.save()
        res.redirect(req.get("referer") || "/");
    } catch (err) {
        console.log("Error while updating bookings");
        res.status(500).send("Database error");
    }
}