const express = require('express');
const demo = express.Router();
//
demo.get('/demo', function(req, res, next) {
    res.status(200)
    res.send('Demo')
})
//
module.exports = demo;