const express = require('express');
const hostRouter = express.Router();
const {rentHouse}=require('../controllers/hostController');
const {thankUser}=require('../controllers/hostController');
const {hostHomes}=require('../controllers/hostController');
const {deleteHome}=require('../controllers/hostController');
const {editHome}=require('../controllers/hostController');
const {editSuccessfully}=require('../controllers/hostController');
const isAuth=require('../middleware/isAuth');

hostRouter.get('/rent-house',isAuth,rentHouse);
hostRouter.post('/rent-house',isAuth,thankUser);
hostRouter.get('/homes',isAuth,hostHomes);
hostRouter.post('/homes',isAuth,deleteHome);
hostRouter.post('/:houseId/edit',isAuth,editHome);
hostRouter.post('/:houseId/edited',isAuth,editSuccessfully);

module.exports = hostRouter