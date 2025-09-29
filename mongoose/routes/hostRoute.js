const express = require('express');
const hostRouter = express.Router();
const {rentHouse}=require('../controllers/hostController');
const {thankUser}=require('../controllers/hostController');
const {hostHomes}=require('../controllers/hostController');
const {deleteHome}=require('../controllers/hostController');
const {editHome}=require('../controllers/hostController');
const {editSuccessfully}=require('../controllers/hostController');
const checkRole=require('../middleware/checkRole');

hostRouter.get('/rent-house',checkRole("host"),rentHouse);
hostRouter.post('/rent-house',checkRole("host"),thankUser);
hostRouter.get('/homes',checkRole("host"),hostHomes);
hostRouter.post('/homes',checkRole("host"),deleteHome);
hostRouter.post('/:houseId/edit',checkRole("host"),editHome);
hostRouter.post('/:houseId/edited',checkRole("host"),editSuccessfully);

module.exports = hostRouter