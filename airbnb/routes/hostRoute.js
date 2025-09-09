const express = require('express');
const hostRouter = express.Router();
// const path = require('path');
// const rootDir = require('../utils/pathUtils');
const {rentHouse}=require('../controllers/rentHouse')
const {thankUser}=require('../controllers/rentHouse')


hostRouter.get('/rent-house',rentHouse);
hostRouter.post('/rent-house',thankUser);

module.exports = hostRouter