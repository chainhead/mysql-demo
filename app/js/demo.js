const path = require('path')
//
const express = require('express');
const demo = express.Router();
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
// This is a dummy route. It will be deprecated.
// 
demo.get('/demo', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Request-Id', req.header('X-Nginx-header'))
    //
    let j
    qry.q0001(dbConn, null, (err, resp) => {
        if (err) {
            logger.error('Q0001 - Request ID: %s Code: %s Number: %d SQLSTATE: %s Message: %s', req.header('X-Nginx-header'), err.code, err.errno, err.sqlState, err.sqlMessage)
            res.status(502)
            j = JSON.stringify({})
            res.send(j)
        } else {
            logger.info('Q0001 - Request ID: %s', req.header('X-Nginx-header'))
            j = JSON.stringify({
                r: resp.res,
                f: resp.fields
            })
            res.status(200)
            res.send(j)
        }
    })
})
//
// Get broker details of all brokers.
// 
demo.get('/regnum', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Request-Id', req.header('X-Nginx-header'))
    //
    let j
    qry.q0002(dbConn, null, (err, resp) => {
        if (err) {
            logger.error('Q0002 - Request ID: %s Code: %s Number: %d SQLSTATE: %s Message: %s', req.header('X-Nginx-header'), err.code, err.errno, err.sqlState, err.sqlMessage)
            res.status(502)
            j = JSON.stringify({})
            res.send(j)
        } else {
            logger.info('Q0002 - Request ID: %s', req.header('X-Nginx-header'))
            j = JSON.stringify({
                r: resp.res
            })
            res.status(200)
            res.send(j)
        }
    })
})
//
// Get broker details based on registration number.
// 
demo.get('/regnum/:id', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Request-Id', req.header('X-Nginx-header'))
    //
    let j
    qry.q0003(dbConn, [req.params.id], (err, resp) => {
        if (err) {
            logger.error('Q0003 - Request ID: %s Code: %s Number: %d SQLSTATE: %s Message: %s', req.header('X-Nginx-header'), err.code, err.errno, err.sqlState, err.sqlMessage)
            res.status(502)
            j = JSON.stringify({})
            res.send(j)
        } else {
            logger.info('Q0003 - Request ID: %s', req.header('X-Nginx-header'))
            j = JSON.stringify({
                r: resp.res
            })
            res.status(200)
            res.send(j)
        }
    })
})
//
// Get broker details based on filters in body.
// 
module.exports = { demo, connSetup };