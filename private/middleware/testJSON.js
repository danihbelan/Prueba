/**
 * Created by danihbelan on 14/7/17.
 */
var Ajv = require('ajv');
var ajv = new Ajv({allErrors: true});
var codigos = require('../codeWrapper')

/**
 * Funcion encargada de comprobar la validacion de un JSON
 * @param data: req.body de la peticion
 * @param schema: esquma de validacion del JSON
 */
exports.test = function(data, schema) {

    var validate = ajv.compile(schema);
    var valid = validate(data);

    if (valid) {
        console.log('Valid!');
    }
    else {
        console.log('Invalid: ' + ajv.errorsText(validate.errors));
        return codigos.responseFail(res, 10020)
    }
}
