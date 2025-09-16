const express = require('express');
const hostRouter = express.Router();
const {rentHouse}=require('../controllers/hostController');
const {thankUser}=require('../controllers/hostController');
const {hostHomes}=require('../controllers/hostController');
const {deleteHome}=require('../controllers/hostController');
const {editHome}=require('../controllers/hostController');
const {editSuccessfully}=require('../controllers/hostController');

hostRouter.get('/rent-house',rentHouse);
hostRouter.post('/rent-house',thankUser);
hostRouter.get('/homes',hostHomes);
hostRouter.post('/homes',deleteHome);
hostRouter.post('/:houseId/edit',editHome);
hostRouter.post('/:houseId/edited',editSuccessfully);

module.exports = hostRouter