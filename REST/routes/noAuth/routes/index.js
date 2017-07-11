var express = require('express');
var router = express.Router();
var _ = require('lodash');
var mysql =require('../query'); //Esta variable invoca el objeto con las querys
var generateToken=require('../../../../private/serviceToken/generateToken')
var codigos = require('../../../../private/codeWrapper')


/**
 * Esta ruta renderiza el layout del cliente.
 */
router.get('/', function(req, res, next) {
    res.render('views/layout');
});

/*router.get('/prueba', function(req, res, next) {
    res.render('prueba');
});

router.get('/resource', function(req, res, next) {
    var miJSON = {autorizado: "ok"}
    res.status(200).json(miJSON);
});*/


/**
 *Funcion encargada de llevar a cabo la query con el registro. Es llamada desde el cliente.
 */
router.post('/registro', function(req, res, next) {
    console.log("Nombre y contraseña de usuario en registro: ", req.body)
    var user = req.body.user
    var password = req.body.password
    if (_.isUndefined(user) || _.isUndefined(password) || password == "" || user == "")
        return codigos.responseFail(res,10001)

    var values={user: user, password: password}
    //Con la llmada a mysql.registro hacemos una llamada a la query correspondiente que se encuentra en el fichero query.js
    //Debemos de pasarle como parametros los valores y la funcion callback
    mysql.registro(values, function (error, result) {
        if (error)
            return codigos.responseFail(res,10001)

        codigos.responseOk(res,0)
    })
});


/**
 *Funcion encargada de llevar a cabo la query con el login. Es llamada desde el cliente.
 * Ademas se implementa la generacion del token si el login es correcto
 */
router.post('/login', function(req, res, next) {
    console.log("Nombre y contraseña de usuario: ", req.body)
    var user = req.body.user
    var password = req.body.password
    console.log(req.body)
    if (_.isUndefined(user) || _.isUndefined(password) || password=="" || user=="")
        return codigos.responseFail(res,10000)

    var values={user: user, password: password}
    //Con la llmada a mysql.login hacemos una llamada a la query correspondiente que se encuentra en el fichero query.js
    //Debemos de pasarle como parametros los valores y la funcion callback (se hacen callbacks anidados)
    mysql.login(values, function (error, result) {
        if (error){
            return codigos.responseFail(res,10000)
        }
        //Obtenemos el token llamando a la funcion implementada para generar tokens
        var token = generateToken(result)
        console.log(token)
        //res.status(200).json({token: token});
        codigos.responseOk(res,0)
    })
});


module.exports = router;
