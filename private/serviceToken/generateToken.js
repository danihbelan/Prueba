/**
 * Created by danihbelan on 22/6/17.
 * Funcion encargada de generar un token para control de sesiones en RestFull
 * Usamos la libreria jwt-simple
 */
var jwt = require('jwt-simple');

/**
 * La funcion toma como paramentro de entrada el id del cliente. Se genera el token a partir del payload
 * y de una contraseña. (Usar misma contraseña para desencriptar posteriormente el token)
 * @param id
 * @returns {String}
 */
function generateToken(id) {

    var payload = {id: id};
    var secret = 'mipass';

    var token = jwt.encode(payload, secret);
    return token
}

module.exports=generateToken

