const registeredHouse = require('../models/houses');
const express = require('express');
const app = express();
const db=require('../utils/database');

app.use(express.urlencoded({ extended: true }));

exports.showData = (req, res) => {
    registeredHouse.fetch().then(([houses]) => {
        res.render('store/index', { data: houses, title: "Home" });
    }).catch(err => {
        console.log("Error while rendering Data");
    })
}

exports.getHousesList = (req, res) => {
    registeredHouse.fetch().then(([houses]) => {
        res.render('store/houses-list', { data: houses, title: "Home" });
    }).catch(err => {
        console.log("Error while rendering Data");
    })
}

exports.getBookings = (req, res) => {
    res.render('store/bookings', { title: "Bookings" })
}

exports.getDetails = (req, res) => {
    registeredHouse.fetch().then(([houses]) => {
        let house = houses.find((x) => x.houseId == req.params.houseId);
        if (house) {
            res.render('store/details', { title: "Details", data: house });
        } else {
            {
                res.status(404).render('404', { title: "Not Found" });
            }
        }
    }).catch(err => {
        console.log("Error while rendering Detail Page");
    })
}

exports.getFavourites = (req, res) => {

    registeredHouse.fetch().then(([houses]) => {
        let favourites = houses.filter(h => h.isFavourite == true);
        res.render('store/favourites', { data: favourites, title: "Favourites" });
    }).catch(err => {
        console.log("Error while rendering Data");
    });
};

exports.toggleFavourite = (req, res) => {
    const { houseId } = req.body;
    db.execute(
        "UPDATE houses SET isFavourite = NOT isFavourite WHERE houseId = ?",
        [houseId]
    )
    .then(() => {
          const referer = req.get("referer");
        if (referer) {
            res.redirect(referer); 
        } else {
            res.redirect('/');
        }
    })
    .catch(err => {
        console.log("Error while updating favourite:", err);
        res.status(500).send("Database error");
    });
};
