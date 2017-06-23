var express = require('express');
var router = express.Router();

/**
 * En este archivo añadimos todas las rutas templates.
 * Donde se renderiza a los jades correspondientes de la parte del cliente (website)
 */


router.get('/indexNoAuthTemp', function(req, res, next) {
    res.render('angularjs/controllers/noAuth/index/indexNoAuth');
});

router.get('/loginTemp', function(req, res, next) {
    res.render('angularjs/controllers/noAuth/login/login');
});

router.get('/registroTemp', function(req, res, next) {
    res.render('angularjs/controllers/noAuth/registro/registro');
});


module.exports = router;
