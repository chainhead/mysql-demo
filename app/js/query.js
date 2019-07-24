//
function q0001(dbConn, options, callback) {
    var query = 'SELECT 1 as resp';
    dbConn.query(query, (err, res, fields) => {
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
    q0001
}