var express = require('express');
var router = express.Router();
var mysql = require('../../../../private/database/connection');
var _ = require('lodash')
var tokenMiddleware = require('../../../../private/middleware/middleware').tokenMiddleware

router.use(tokenMiddleware)

/* GET users listing. */
router.get('/pruebaAutorizada', function(req, res, next) {
  res.status(200).json({Codigo: 'ok'});
});



module.exports = router;

