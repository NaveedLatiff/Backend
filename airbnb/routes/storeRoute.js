const express=require('express');
const storeRouter=express.Router();
const {showData}=require('../controllers/storeController');
const {getBookings}=require('../controllers/storeController');
const {getHousesList}=require('../controllers/storeController');
const {getFavourites}=require('../controllers/storeController')
const {getDetails}=require('../controllers/storeController');
const {toggleFavourite}=require('../controllers/storeController');

storeRouter.get('/',showData);
storeRouter.get('/bookings',getBookings);
storeRouter.get('/homes',getHousesList);
storeRouter.get('/favourites',getFavourites);
storeRouter.get('/homes/:houseId',getDetails);
storeRouter.post('/favourites',toggleFavourite);
module.exports=storeRouter;