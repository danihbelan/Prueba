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

router.post('/registroEmpresa', function(req, res, next) {
  if(!req.body.empresa)
    return codigos.responseFail(res,10002)

  var datos = {empresa: req.body.empresa, id: req.idUser}
  console.log('Datos: ', datos)
  query.registroEmpresa(datos, function (error, result) {
      if(error)
          return codigos.responseFail(res,10002)

      codigos.responseOk(res,0)

  })
});


router.get('/listaEmpresas', function(req, res, next) {
    //Realizamos una query para obtener el listado de las empresas
    query.listaEmpresas(function (error, result) {
        if (error)
            return codigos.responseFail(res,10003)

        //codigos.responseOk(res,0)
        res.status(200).json(result);

    })
});

router.post('/puntuaEmpresa', function(req, res, next) {

    if(!req.body.id)
        return codigos.responseFail(res,10004)

    var datos = {id: req.body.id, puntuacion: req.body.puntuacion}

    query.getInfoById(datos, function (error, result) {
        if (error)
            return codigos.responseFail(res,10004)

        var punt = result[0].puntuacion
        var n_punts = result[0].n_puntuaciones
        datos.puntuacion = punt*(n_punts/(n_punts+1)) + datos.puntuacion*(1/(n_punts+1))
        console.log('Nueva puntuacion: ', datos)


        //Realizamos una query para añadir una puntuacion a una empresa
        query.puntuaEmpresa(datos, function (error, result) {
            if (error)
                return codigos.responseFail(res,10004)

            codigos.responseOk(res,0)

        })

    })
});


module.exports = router;

