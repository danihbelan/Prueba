/**
 * Created by danihbelan on 20/6/17.
 * En este archivo se definiran las diferentes querys de la parte autorizada del servidor
 */
var mysql = require('../../../private/database/connection')

/**
 * Query encargada del registor de una empresa en la base de datos
 * Se llevan a cabo dos query una para añadir la empresa a la tabla correspondiente
 * y otra para añadir el usuario que la ha registrado a la tabla relacionada
 * @param values: contiene el nombre de la empresa y el id del usuario que la registra
 * @param callback
 */
exports.registroEmpresa = function(values, callback) {
    var valuesEmpresa = [values.empresa]

    query = 'INSERT INTO empresas(nombre) ' +
        'VALUES(?)';
    mysql.query(query, valuesEmpresa,  function (error, results, fields) {
        if (error) {
            console.error(error)
            return callback(10002, null)
        }

        var valuesRelacion = [values.id, results.insertId]
        console.log(valuesRelacion)
        query = 'INSERT INTO users_has_empresas(users_id, empresas_id) ' +
            'VALUES(?,?)';
        mysql.query(query, valuesRelacion,  function (error, results, fields) {
            if (error) {
                console.error(error)
                return callback(10002, null)
            }
            callback(null, 0)

        })
    });
}

/**
 * Query encargada de obtener los datos de la tabla empresas de la base de datos
 * @param callback
 */
exports.listaEmpresas = function(callback) {

    query = 'SELECT * FROM empresas';
    mysql.query(query, function (error, results, fields) {
        if (error) {
            console.error(error)
            return callback(10003, null)
        }
        console.log(results)
        callback(null, results)
    });

}

/**
 * Query encargada de actualizar la puntuacion de una empresa.
 * Se actualiza el campo puntuacion y se aumenta en uno el valor
 * del campo n_puntuaciones
 * @param values
 * @param callback
 */
exports.puntuaEmpresa = function(values, callback) {
    var valuesPuntuacion = [values.puntuacion, values.id]

    query = 'UPDATE empresas ' +
        'SET puntuacion=?, n_puntuaciones=n_puntuaciones+1 ' +
        'WHERE id=?'
    mysql.query(query, valuesPuntuacion, function (error, results, fields) {
        if (error) {
            console.error(error)
            return callback(10004, null)
        }
        console.log(results)
        callback(null, 0)
    });

}

/**
 * Query encargada de devolver la informacion de una empresa de la tabla empresas
 * a partir del id dado.
 * @param values
 * @param callback
 */
exports.getInfoByID = function (values, callback) {
    var value = [values.id]
    query = 'SELECT * FROM empresas' +
        ' WHERE id=?'


    mysql.query(query, value,  function (error, results, fields) {
        if (error) {
            console.error(error)
            return callback(10005, null)
        }
        console.log(results)
        callback(null, results)
    });

}