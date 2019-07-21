const path = require('path')
//
const moduleLogger = require('./logger')
const MODULE = path.basename(__filename)
const logger = moduleLogger.moduleLogger(MODULE)
//
function connectDb(config, callback) {
    logger.info('Database connected successfully.')
    return callback(null, null)
}
//
function connectCache(config, callback) {
    logger.info('Cache connected successfully.')
    return callback(null, null)
}
//
function doConnect(dbConfig, cacheConfig, callback) {
    let dbConn
    let cacheConn
    //
    connectDb(dbConfig, (err, res) => {
        if (err) {
            logger.error('%s', err.msg)
            return callback('err', null)
        } else {
            dbConn = res
            connectCache(cacheConfig, (err, res) => {
                if (err) {
                    logger.error('%s', err.msg)
                    return callback('err', null)
                } else {
                    cacheConn = res
                    return callback(null, {
                        db: dbConn,
                        cache: cacheConn
                    })
                }
            })
        }
    })
}
module.exports = { doConnect }