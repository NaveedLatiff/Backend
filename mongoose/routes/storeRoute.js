const express=require('express');
const storeRouter=express.Router();
const {showData}=require('../controllers/storeController');
const {getHousesList}=require('../controllers/storeController');
const {getDetails}=require('../controllers/storeController');
const {getFavourites}=require('../controllers/storeController')
const {toggleFavourite}=require('../controllers/storeController');
const {getBookings}=require('../controllers/storeController')
const {toggleBooking}=require('../controllers/storeController');
const checkRole=require('../middleware/checkRole');

storeRouter.get('/',showData);
storeRouter.get('/homes',checkRole("user"),getHousesList);
storeRouter.get('/homes/:houseId',checkRole("user"),getDetails);
storeRouter.get('/favourites',checkRole("user"),getFavourites);
storeRouter.post('/favourites',checkRole("user"),toggleFavourite);
storeRouter.get('/bookings',checkRole("user"),getBookings);
storeRouter.post('/bookings',checkRole("user"),toggleBooking);
module.exports=storeRouter;