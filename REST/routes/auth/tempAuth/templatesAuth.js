var express = require('express');
var router = express.Router();


/**
 * En este archivo añadimos todas las rutas templates.
 * Donde se renderiza a los jades correspondientes de la parte del cliente (website)
 */


router.use(require('../../../../private/middleware/middleware').tokenMiddleware)
router.get('/indexAuthTemp', function(req, res, next) {
    res.render('angularjs/controllers/auth/index/indexAuth');
});

router.get('/welcomeTemp', function(req, res, next) {
    res.render('angularjs/controllers/Auth/welcome/welcome');
});


module.exports = router;
