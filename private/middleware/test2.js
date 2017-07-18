/**
 * Created by danihbelan on 18/7/17.
 */

exports.validarSchema = function (schema) {


    return function (req, res, next) {

        // console.log(schema);

        //console.log(req.body);

        //console.log("validando esquema...");

        var ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

        //var validate = ajv.compile(schema);

        // console.log("compilado esquema");

        var ok = ajv.validate(schema, req.body);

        // console.log("ok-> "+ok);

        if (!ok) {

            // console.error("ERROR :(",ajv.errors);

            res.status(403).json(codigos.responseForbidden(res, 10030));

        }

        else {

            console.log("Exito en la validación");

            next();

        }

    };

};