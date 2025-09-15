const express = require('express');
const hostRouter = express.Router();
const {rentHouse}=require('../controllers/hostController')
const {thankUser}=require('../controllers/hostController')
const {hostHomes}=require('../controllers/hostController')

hostRouter.get('/rent-house',rentHouse);
hostRouter.post('/rent-house',thankUser);
hostRouter.get('/homes',hostHomes);

module.exports = hostRouter