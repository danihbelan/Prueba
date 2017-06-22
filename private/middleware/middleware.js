/**
 * Created by danihbelan on 22/6/17.
 */
var jwt = require('jwt-simple')

exports.tokenMiddleware=function(req, res, next) {
    //console.log(req.headers)
    if(!req.headers.authorization)
        return res.status(403).json({Mensaje: 'No hay cabecera de autenticacion'})

    var token=req.headers.authorization.split(' ')[1]
    try {
        var payload = jwt.decode(token, 'mipass');
        console.log('El payload es: ', payload)
        req.idUser=payload.id
        next()
    }catch(err){
        return res.status(403).json({Mensaje: 'Error al decodificar'})
    }





}