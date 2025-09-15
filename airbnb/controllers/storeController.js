const fs=require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtils");
const registeredHouse=require('../models/houses');
const express=require('express');
const app=express();
app.use(express.urlencoded({ extended: true }));

exports.showData=(req,res)=>{
    registeredHouse.fetch((houses)=>{
        res.render('store/index',{data:houses,title:"Home"});
    })
}

exports.getHousesList=(req,res)=>{
    registeredHouse.fetch((houses)=>{
        res.render('store/houses-list',{data:houses,title:"Homes"});
    })
}

exports.getBookings=(req,res)=>{
    res.render('store/bookings',{title:"Bookings"})
}

exports.getDetails=(req,res)=>{
    registeredHouse.fetch(houses=>{
        let  house=houses.find((x)=>x.houseId==req.params.houseId);
        if(house){
        res.render('store/details',{title:"Details",data:house});
        }else{
           {
            res.status(404).render('404', { title: "Not Found" });
        }
        }
    })
}

exports.getFavourites=(req,res)=>{
 registeredHouse.fetch(houses=>{
    let favourites=houses.filter(h=>h.isFavourite==true);
    res.render('store/favourites',{data:favourites,title:"Favourites"});
 });   
};

exports.toggleFavourite=(req,res)=>{
    const {houseId}=req.body;
    console.log(houseId)
    registeredHouse.fetch(houses=>{
        const favouriteHouse=houses.find(x=>x.houseId===houseId);
        if(favouriteHouse){
            favouriteHouse.isFavourite=!favouriteHouse.isFavourite;
             const housesDataPath = path.join(rootDir, 'data', 'houses.json');
      fs.writeFile(housesDataPath, JSON.stringify(houses), err => {
        if (err) {
          console.log("Error saving favourites:", err);
        }
        res.redirect('/homes');
      });
    } else {
      res.redirect('/homes');
    }
            
    });
};