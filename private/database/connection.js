/**
 * Created by danihbelan on 2/6/17.
 */

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'toor',
    database : 'prueba'
});

connection.connect();

connection.query('SELECT 1+1', function (error, results, fields) {
    if (error) {
        console.error(error)

    }
    console.log('The solution is: ', results);

});


module.exports = connection