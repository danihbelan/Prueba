/**
 * Created by danihbelan on 20/6/17.
 */
var mysql = require('../../../private/database/connection')

exports.login = function(values, callback) {
    var values = [values.user,values.password]
    var query = 'SELECT * FROM users ' +
        'WHERE name=? ' +
        'AND password=?'



    mysql.query(query, values, function (error, results, fields) {
        if (error) {
            console.error(error)
            return callback(error, null)

        }
        if (results.length != 1)
            return callback({codigos: 'No existe'}, null)

        callback(null, {codigos: 'Existe'})

    });
}

exports.registro = function(values, callback) {
    var values = [values.user,values.password]
    var query = 'INSERT INTO users(name, password) ' +
        'VALUES(? , ?)'

    mysql.query(query, values,  function (error, results, fields) {
        if (error) {
            console.error(error)
            return callback(error, null)
        }

        callback(null, {codigos: 'Registro correcto'})

    });
}
