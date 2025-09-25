const express=require('express');
const storeRouter=express.Router();
const {showData}=require('../controllers/storeController');
const {getBookings}=require('../controllers/storeController');
const {getHousesList}=require('../controllers/storeController');
const {getFavourites}=require('../controllers/storeController')
const {getDetails}=require('../controllers/storeController');
const {toggleFavourite}=require('../controllers/storeController');
const isAuth=require('../middleware/isAuth');

storeRouter.get('/',showData);
storeRouter.get('/bookings',isAuth,getBookings);
storeRouter.get('/homes',isAuth,getHousesList);
storeRouter.get('/favourites',isAuth,getFavourites);
storeRouter.get('/homes/:houseId',isAuth,getDetails);
storeRouter.post('/favourites',isAuth,toggleFavourite);
module.exports=storeRouter;