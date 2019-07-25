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
    qry.q0000(dbConn, null, (err, resp) => {
        if (err) {
            logger.error('Q0000 - Request ID: %s Code: %s Number: %d SQLSTATE: %s Message: %s', req.header('X-Nginx-header'), err.code, err.errno, err.sqlState, err.sqlMessage)
            res.status(502)
            j = JSON.stringify({})
            res.send(j)
        } else {
            logger.info('Q0000 - Request ID: %s', req.header('X-Nginx-header'))
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
demo.get('/regnums', (req, res, next) => {
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
            if (resp.res) {
                logger.info('Q0001 - Request ID: %s', req.header('X-Nginx-header'))
            } else {
                logger.warn('Q0001 - Request ID: %s', req.header('X-Nginx-header'))
            }
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
    qry.q0002(dbConn, [req.params.id], (err, resp) => {
        if (err) {
            logger.error('Q0002 - Request ID: %s Code: %s Number: %d SQLSTATE: %s Message: %s', req.header('X-Nginx-header'), err.code, err.errno, err.sqlState, err.sqlMessage)
            res.status(502)
            j = JSON.stringify({})
            res.send(j)
        } else {
            if (resp.res) {
                logger.info('Q0002 - Request ID: %s', req.header('X-Nginx-header'))
            } else {
                logger.warn('Q0002 - Request ID: %s', req.header('X-Nginx-header'))
            }
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
demo.get('/regnum', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Request-Id', req.header('X-Nginx-header'))
    //
    let j
    if (req.body) {
        // Request body has payload
        let b = req.body;
        if (b.filters) {
            // filters key was found in the payload
            let keys = Object.keys(b.filters)
            if (keys.length) {
                // Number of filters is non-zero
                let options = ''
                for (i = 0; i < keys.length; ++i) {
                    let cols = b.filters[keys[i]]
                    let s = ''
                    if (cols.length) {
                        s += keys[i] + ' IN ('
                        for (j = 0; j < cols.length; ++j) {
                            s += "'" + cols[j] + "',"
                        }
                        s = s.slice(0, -1)
                        s += ') AND '
                        options += s
                    } else {
                        logger.warn('No values found for filter %s', keys[i])
                        j = JSON.stringify({
                            err: "No values found for filter " + keys[i]
                        })
                        res.status(422)
                        res.send(j)
                    }
                }
                options = options.slice(0, -4)
                let opts = {
                    list: options
                }
                //
                qry.q0003(dbConn, opts, (err, resp) => {
                    if (err) {
                        logger.error('Q0003 - Request ID: %s Code: %s Number: %d SQLSTATE: %s Message: %s', req.header('X-Nginx-header'), err.code, err.errno, err.sqlState, err.sqlMessage)
                        res.status(502)
                        j = JSON.stringify({})
                        res.send(j)
                    } else {
                        if (resp.res) {
                            logger.info('Q0003 - Request ID: %s', req.header('X-Nginx-header'))
                        } else {
                            logger.warn('Q0003 - Request ID: %s', req.header('X-Nginx-header'))
                        }
                        j = JSON.stringify({
                            r: resp.res
                        })
                        res.status(200)
                        res.send(j)
                    }
                })
            } else {
                // Number of filters is zero
                j = JSON.stringify({
                    err: "No filters found."
                })
                res.status(422)
                res.send(j)
            }
        } else {
            // filters key was not found in the payload
            j = JSON.stringify({
                err: "No filters found."
            })
            res.status(422)
            res.send(j)
        }
    } else {
        // Request body was empty
        j = JSON.stringify({
            err: "No filters found."
        })
        res.status(400)
        res.send(j)
    }
})
//
module.exports = { demo, connSetup };