var express = require('express');
var router = express.Router();
var mysql = require('../../../../private/database/connection');
var _ = require('lodash')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



module.exports = router;

