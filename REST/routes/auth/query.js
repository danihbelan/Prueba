/**
 * Created by danihbelan on 20/6/17.
 */
var mysql = require('../../../private/database/connection')

exports.registroEmpresa = function(values, callback) {
    var valuesEmpresa = [values.empresa]

    query = 'INSERT INTO empresas(nombre) ' +
        'VALUES(?)';
    mysql.query(query, valuesEmpresa,  function (error, results, fields) {
        if (error) {
            console.error(error)
            return callback(error, null)
        }

        var valuesRelacion = [values.id, results.insertId]
        console.log(valuesRelacion)
        query = 'INSERT INTO users_has_empresas(users_id, empresas_id) ' +
            'VALUES(?,?)';
        mysql.query(query, valuesRelacion,  function (error, results, fields) {
            if (error) {
                console.error(error)
                return callback(error, null)
            }
            callback(null, {Codigo: 'Registro correcto'})

        })
    });

}


exports.listaEmpresas = function(callback) {

    query = 'SELECT * FROM empresas';
    mysql.query(query, function (error, results, fields) {
        if (error) {
            console.error(error)
            return callback(error, null)
        }
        console.log(results)
        callback(null, results)
    });

}

exports.puntuaEmpresa = function(values, callback) {
    var valuesPuntuacion = [values.puntuacion, values.id]
    console.log('Datos en query: ', valuesPuntuacion)
    query = 'UPDATE empresas SET puntuacion=?,  n_puntuaciones=n_puntuaciones+1 WHERE id=?'

    mysql.query(query, valuesPuntuacion, function (error, results, fields) {
        if (error) {
            console.error(error)
            return callback(error, null)
        }
        console.log(results)
        callback(null, results)
    });

}

exports.getInfoById = function (values, callback) {
    var value = [values.id]
    query = 'SELECT * FROM empresas' +
        ' WHERE id=?'


    mysql.query(query, value,  function (error, results, fields) {
        if (error) {
            console.error(error)
            return callback(10020, null)
        }
        console.log(results)
        callback(null, results)
    });

}