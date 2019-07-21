const path = require('path')
const http = require('http')
const express = require('express')
//
const moduleLogger = require('./logger')
const MODULE = path.basename(__filename)
const logger = moduleLogger.moduleLogger(MODULE)
//
const demo = require('./demo')
//
function launchServer(config, callback) {
    const app = express()
    app.use(demo)
    var server = http.createServer(app).listen(config.port)
    //
    server.on('error', (e) => {
        logger.error('%s', e)
        return callback(e, null)
    })
    logger.info('Server launched at port %d', config.port)
    return callback(null, null)
}
//
module.exports = {
    launchServer
}