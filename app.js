var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lodash = require('lodash');

var index = require('./REST/routes/noAuth/routes/index');
var users = require('./REST/routes/auth/routes/users');
var tempNoAuth = require('./REST/routes/noAuth/tempNoAuth/templatesNoAuth');
var tempAuth = require('./REST/routes/auth/tempAuth/templatesAuth');

var app = express();

//Definimos la ruta donde se encuentran los jades con las vistas
app.set('views', path.join(__dirname, 'website'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// **** RUTAS A PARTIR DE AQUI **** //
app.use('/users', users);
app.use('/tempAuth', tempAuth);
app.use('/tempNoAuth', tempNoAuth);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //En caso de no encontrar una coincidencia en las rutas respondemos con la renderización del layout
  //ya que en este se encuentran todas las librerias y scripts necesarios. (Cuando no haya coincidencia normalmente
  //habra un estado que responda a dicha ruta por lo que es necesario la carga del layout siempre)
  res.render('views/layout');
});

module.exports = app;
