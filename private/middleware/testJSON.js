/**
 * Created by danihbelan on 14/7/17.
 */
var Ajv = require('ajv');
var ajv = new Ajv({allErrors: true});
var codigos = require('../codeWrapper')

/**
 * Funcion encargada de comprobar la validacion de un JSON
 * @param schema: esquema de validacion del JSON
 */
exports.test = function(schema) {
    console.log('Entra en test');
    return function (req, res, next) {
        console.log('Entra en return');
        var validate = ajv.compile(schema);
        //var valid = validate(req.body);
        var valid = validate({id: 32});

        if (valid) {
            console.log('Valid!');
            next()
        }
        else {
            console.log('Invalid: ' + ajv.errorsText(validate.errors));
            res.status(403).json(codigos.responseForbidden(res, 10020));
        }
    }
}
