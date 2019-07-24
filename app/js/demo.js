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
    res.setHeader('X-Request-Id', req.header('X-Nginx-header'))
    //
    let j
    qry.q0001(dbConn, null, (err, resp) => {
        if (err) {
            logger.error('Q0001 - Request ID: %s Code: %s Number: %d SQLSTATE: %s Message: %s', req.header('X-Nginx-header'), err.code, err.errno, err.sqlState, err.sqlMessage)
            res.status(502)
            j = JSON.stringify({e:'err'})
            res.send(j)
        } else {
            logger.info('Q0001 - Request ID: %s', req.header('X-Nginx-header'))
            j = JSON.stringify({
                r : resp.res,
                f : resp.fields
            })
            res.status(200)
            res.send(j)
        }
    })
})
//
module.exports = { demoRouter, connSetup };