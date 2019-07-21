const process = require('process')
const fs = require('fs')
const path = require('path')
//
const moduleLogger = require('./logger')
const MODULE = path.basename(__filename)
const logger = moduleLogger(MODULE)
//
let dbConn;
let cacheConn;
//
function startUp(args, callback) {
    if (args.length < 5) {
        logger.error('Missing arguments for start-up. Exiting.')
        process.exit(8)
    } else {
        logger.info('Checking received arguments.')
    }
    //
    if (fs.existsSync(args[2])) {
        logger.info('Checking server configuration %s', args[2])
    } else {
        logger.error('Server configuration file %s not found. Exiting.', args[2])
        process.exit(8)
    }
    //
    if (fs.existsSync(args[3])) {
        logger.info('Checking database configuration %s', args[3])
    } else {
        logger.error('Database configuration file %s not found. Exiting.', args[3])
        process.exit(8)
    }
    //
    if (fs.existsSync(args[4])) {
        logger.info('Checking cache configuration %s', args[4])
    } else {
        logger.error('Cache configuration file %s not found. Exiting.', args[4])
        process.exit(8)
    }
    //
    var configFiles = {
        server: args[2],
        db: args[3],
        cache: args[4]
    }
    return callback(null, configFiles)
}
//
function checkServerConfiguration(config, callback) {
    logger.info('Server configuration file is valid.')
    return callback(null, null)
}
//
function checkDbConfiguration(config, callback) {
    logger.info('Database configuration file is valid.')
    return callback(null, null)
}
//
function checkCacheConfiguration(config, callback) {
    logger.info('Cache configuration file is valid.')
    return callback(null, null)
}
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
startUp(process.argv, (err, res) => {
    if (err) {
        // TODO: Handle error from start-up
    }
    //
    var serverConfig = res.server
    var dbConfig = res.db
    var cacheConfig = res.cache
    //
    checkServerConfiguration(serverConfig, (err, res) => {
        if (err) {
            logger.error('Server configuration error. %s', err.msg)
            process.exit(8)
        } else {
            checkDbConfiguration(dbConfig, (err, res) => {
                if (err) {
                    logger.error('Database configuration error. %s', err.msg)
                    process.exit(8)
                } else {
                    checkCacheConfiguration(cacheConfig, (err, res) => {
                        if (err) {
                            logger.error('Cache configuration error. %s', err.msg)
                            process.exit(8)
                        } else {
                            dbConn = connectDb(dbConfig, (err, res) => {
                                if (err) {
                                    logger.error('%s', err.msg)
                                    process.exit(8)
                                } else {
                                    cacheConn = connectCache(cacheConfig, (err, res) => {
                                        if (err) {
                                            logger.err('%s', err.msg)
                                        } else {

                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})