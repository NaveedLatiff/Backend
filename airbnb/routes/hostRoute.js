const express = require('express');
const hostRouter = express.Router();
const path = require('path');
const rootDir = require('../utils/pathUtils');


hostRouter.get('/rent-house', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'rentHome.html'))
});

hostRouter.post('/rent-house', (req, res) => {
    let name = req.body.fullName
    res.render('thankYou', { name: name });
});

module.exports = hostRouter