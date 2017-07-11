/**
 * Created by danihbelan on 20/6/17.
 * En este archivo se definiran las diferentes querys de la parte no autorizada del servidor
 * Para cada query a de definirse la funcion callaback (tendremos una estructura de callbacks anidados)
 */

//Invocamos el objeto exportado en connection.js que establece la conexion con la base de datos
var mysql = require('../../../private/database/connection')

/**
 * Se trata de una funcion que realiza la query para el login
 * La funcion se define con export de manera que directamente se puede exportar este objeto para ser llamado
 * desde el index.js. Se le pasa coomo parametros de entrada los valores y la funcion callback
 * @param values
 * @param callback
 */
exports.login = function(values, callback) {
    //Definimos previamente las variables que se mandan en la query.
    //La variable query la definimos con esta estructura de forma que sea más facil de leer
    var values = [values.user,values.password]
    var query = 'SELECT * FROM users ' +
        'WHERE name=? ' +
        'AND password=?'

    mysql.query(query, values, function (error, results, fields) {
        if (error) {
            console.error(error)
            //Devolvemos la función callback con los parametros correspondientes
            return callback(10000, null)
        }

        if (results.length != 1)
        //Este caso no se trata de un error en si mismo sino un error que nosotros
        //hemos definido por lo tanto el parametro error que mandamos debe ser algun
        //mensaje que definiremos nosotros mismos
            return callback(10000, null)


        callback(null, results[0].id)

    });
}

/**
 * Se trata de una funcion que realiza la query para el registro
 * La estructura y el funcionamiento es similar a la anterior query
 * (mirar los comentarios de esta)
 * @param values
 * @param callback
 */
exports.registro = function(values, callback) {
    var values = [values.user,values.password]

    query = 'INSERT INTO users(name, password) ' +
        'VALUES(? , ?)';
    mysql.query(query, values,  function (error, results, fields) {
        if (error) {
            console.error(error)
            return callback(10001, null)
        }

        callback(null, 0)

    });
}
