/**
 * Created by danihbelan on 22/6/17.
 * Funcion encargada de comprobar el token enviado en cada peticion del cliente
 * Esta funcion es llamada dese un middleware por lo que si se comprueba correctamente el
 * token se continua con la peticion. En caso contrario se corta el flujo y se envia un mensaje de error.
 */
var jwt = require('jwt-simple')

exports.tokenMiddleware=function(req, res, next) {
    //console.log(req.headers)
    //En primer lugar comprobamos si tenemos cabecera de autenticacion donde se encontraria el token
    if(!req.headers.authorization)
        return res.status(403).json({Mensaje: 'No hay cabecera de autenticacion'})

    //La cabecera viene compuesta por un string con dos "palabras" el token se encuentra en la segunda
    var token=req.headers.authorization.split(' ')[1]
    try {
        var payload = jwt.decode(token, 'mipass'); //Funcion que decodifica el token
        console.log('El payload es: ', payload)
        req.idUser=payload.id
        next() //cuando es correcto llamamos a la funcion next() que hara que siga la peticion adelante
    }catch(err){
        //Si nos da error (El token no es correcto) cortamos el flujo y mandamos un mensaje de error
        return res.status(403).json({Mensaje: 'Error al decodificar'})
    }

}