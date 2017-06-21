var express = require('express');
var router = express.Router();

/**
 * En este archivo añadimos todas las rutas templates.
 * Donde se renderiza a los jades correspondientes de la parte del cliente (website)
 */

/* GET home page. */
/*router.get('/index', function(req, res, next) {
    res.render('angularjs/controllers/noAuth/index', { title: 'Express' });
});*/

router.get('/indexNoAuthTemp', function(req, res, next) {
    res.render('angularjs/controllers/noAuth/index/indexNoAuth');
});

router.get('/loginTemp', function(req, res, next) {
    res.render('angularjs/controllers/noAuth/login/login');
});

router.get('/registroTemp', function(req, res, next) {
    res.render('angularjs/controllers/noAuth/registro/registro');
});

router.get('/indexAuthTemp', function(req, res, next) {
    res.render('angularjs/controllers/auth/index/indexAuth');
});

router.get('/welcomeTemp', function(req, res, next) {
    res.render('angularjs/controllers/Auth/welcome/welcome');
});


module.exports = router;
