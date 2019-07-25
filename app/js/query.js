//
function q0001(dbConn, options, callback) {
    var q = 'SELECT 1 as Dummy';
    dbConn.query(q, (err, res, fields) => {
        if (err) {
            return callback(err, null)
        } else {
            return callback(null, {
                res: res,
                fields: fields
            })
        }
    })
}
//
function q0002(dbConn, options, callback) {
    var q = 'SELECT `REGISTRATION_NUM`, `NAME`, `TRADE_NAME` from '
        + ' `BROKERS`.`BROKER_DETAILS`';
    dbConn.query(q, [options], (err, res, fields) => {
        if (err) {
            return callback(err, null)
        } else {
            return callback(null, {
                res: res,
                fields: fields
            })
        }
    })
}
//
function q0003(dbConn, options, callback) {
    var q = 'SELECT `REGISTRATION_NUM`, `NAME`, `TRADE_NAME` from '
        + ' `BROKERS`.`BROKER_DETAILS` where registration_num = ?';
    dbConn.query(q, [options], (err, res, fields) => {
        if (err) {
            return callback(err, null)
        } else {
            return callback(null, {
                res: res,
                fields: fields
            })
        }
    })
}
//
module.exports = {
    q0001,
    q0002,
    q0003
}