/**
 * Created by danihbelan on 2/6/17.
 * Se establece la conexion con la base de datos
 */

var mysql      = require('mysql');
//connection sera el objeto a exportar con los metodos de mysql
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'toor',
    database : 'prueba'
});

connection.connect();

//Dejamos esta query de forma que sirve para comprobar si la base de datos
//esta operativa cada vez que arrancamos el servidor
connection.query('SELECT 1+1', function (error, results, fields) {
    if (error) {
        console.error(error)

    }
    console.log('The solution is: ', results);
});

//Exportamos connection
module.exports = connection;