var express = require('express');
var router = express.Router();
var _ = require('lodash')
var mysql =require('../query')

/**
 * Esta ruta renderiza el index del cliente.
 */
router.get('/', function(req, res, next) {
    res.render('views/layout');
});

router.get('/prueba', function(req, res, next) {
    res.render('prueba');
});

router.get('/resource', function(req, res, next) {
    var miJSON = {autorizado: "ok"}
    res.status(200).json(miJSON);

});

/**
 *Funcion encargada de llevar a cabo la query con el registro. Es llamada desde el cliente.
 */
router.post('/registro', function(req, res, next) {
    console.log("Nombre y contraseña de usuario en registro: ", req.body)
    var user = req.body.user
    var password = req.body.password
    if (_.isUndefined(user) || _.isUndefined(password) || password == "" || user == "")
        return res.status(401).json({Estado: "Faltan datos"})

    var values={user: user, password: password}
    mysql.registro(values, function (error, result) {
        if (error){
            return res.status(402).json({Estado: "Error en query"})
        }
        res.status(200).json({});
    })



});

/**
 *Funcion encargada de llevar a cabo la query con el login. Es llamada desde el cliente.
 */
router.post('/login', function(req, res, next) {
    console.log("Nombre y contraseña de usuario: ", req.body)
    var user = req.body.user
    var password = req.body.password
    console.log(req.body)
    if (_.isUndefined(user) || _.isUndefined(password) || password=="" || user=="")
        return res.status(401).json({Estado: "Faltan datos"})

    var values={user: user, password: password}
    mysql.login(values, function (error, result) {
        if (error){
            return res.status(402).json({Estado: "Error en query"})
        }
        res.status(200).json(result);
    })
});


module.exports = router;
