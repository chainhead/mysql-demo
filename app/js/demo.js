const path = require('path')
//
const express = require('express');
const demoRouter = express.Router();
//
const moduleLogger = require('./logger')
const MODULE = path.basename(__filename)
const logger = moduleLogger.moduleLogger(MODULE)
//
const qry = require('./query')
//
let dbConn
let cacheConn
//
function connSetup(conn) {
    dbConn = conn.dbConn
    cacheConn = conn.cacheConn
}
//
demoRouter.get('/demo', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    //
    let j
    qry.q0001(dbConn, null, (err, res) => {
        if (err) {
            logger.error('Q0001  Code: %s Number: %d SQLSTATE: %s Message: %s', err.code, err.errno, err.sqlState, err.sqlMessage)
        } else {
            res.status(200)
            j = JSON.stringify({ a: res[0].resp })
            res.send(j)
        }
    })
})
//
module.exports = { demoRouter, connSetup };