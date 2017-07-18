var express = require('express');
var router = express.Router();
var query = require('../query')
var _ = require('lodash')
var tokenMiddleware = require('../../../../private/middleware/middleware').tokenMiddleware
var codigos = require('../../../../private/codeWrapper')

router.use(tokenMiddleware)

/* GET users listing. */
router.get('/pruebaAutorizada', function(req, res, next) {
  codigos.responseOk(res,0)
});

/**
 * Ruta encargada de las peticiones del registro de una empresa.
 * Se hace una query con los datos de la empresa y del usuario que
 * la registra.
 */
router.post('/registroEmpresa', function (req, res, next) {
    //Validar JSON req.body
    var schema = require('../../../../private/schemas/registroEmpresas').codigoSchema
    router.use(require('../../../../private/middleware/testJSON').test(schema))

    if (!req.body.empresa)
        return codigos.responseFail(res, 10002)

    var datos = {empresa: req.body.empresa, id: req.idUser}
    console.log('Datos: ', datos)
    query.registroEmpresa(datos, function (error, result) {
        if (error)
            return codigos.responseFail(res, error)

        codigos.responseOk(res, result)

    })
});

/**
 * Ruta encargada de hacer una query para obtener el listado de empresas
 * de la base de datos.
 */
router.get('/listaEmpresas', function(req, res, next) {
    //Realizamos una query para obtener el listado de las empresas
    query.listaEmpresas(function (error, result) {
        if (error)
            return codigos.responseFail(res,error)

        codigos.responseOk(res,result)
        //res.status(200).json(result);

    })
});

/**
 * Ruta encargada de las peticiones cuando se puntua a una empresa.
 * En primer lugar se hace una query para obtener los datos de la empresa
 * a puntuar (puntuacion actual y numero de votos). Una vez obtenida la
 * puntuacion se calcula la nueva media y se hace una query para actualizar
 * el valor de la puntuacion media.
 */
router.post('/puntuaEmpresa', function(req, res, next) {
    //Validar JSON req.body
    var schema = require('../../../../private/schemas/puntuaEmpresa').codigoSchema
    router.use(require('../../../../private/middleware/testJSON').test(schema))

    if(!req.body.id)
        return codigos.responseFail(res,10004)

    var datos = {id: req.body.id, puntuacion: req.body.puntuacion}

    query.getInfoByID(datos, function (error, result) {
        if (error)
            return codigos.responseFail(res,10005)

        var punt = result[0].puntuacion
        var n_punts = result[0].n_puntuaciones
        datos.puntuacion = punt*(n_punts/(n_punts+1)) + datos.puntuacion*(1/(n_punts+1))

        //Realizamos una query para añadir una puntuacion a una empresa
        query.puntuaEmpresa(datos, function (error, result) {
            if (error)
                return codigos.responseFail(res,error)

            codigos.responseOk(res,result)

        })

    })
});


module.exports = router;

