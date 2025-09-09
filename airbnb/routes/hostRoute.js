const express = require('express');
const hostRouter = express.Router();
const path = require('path');
const rootDir = require('../utils/pathUtils');
const data = require('../utils/dataStore');

hostRouter.get('/rent-house', (req, res) => {
    res.render('rentHome',{title:"Rent-House"})
});


hostRouter.post('/rent-house', (req, res) => {
    let name = req.body.fullName;
    let city=req.body.houseCity;
    data.unshift({name,city});
    res.render('thankYou', { name,title:"ThankYou" });
    
});

module.exports = hostRouter