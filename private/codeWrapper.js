/**
 * Módulo que encapsula respuestas a peticiones con códigos asociados
 */
exports.errCode = errCode;

/**
 * Encapsula los codigos de errores, devuelve un JSON con una estructura {codigo, mensaje de error, datos si los hubiera}
 * @param errCode
 * @param data
 * @returns {{codigo: (*|number), mensaje: string}}
 */
function errCode(errCode, data){
    errCode = errCode || 0;
    var description = "Error no encontrado";
    switch (errCode){
        // ========= CODIGOS PARA RESPUESTA OK / RESPUESTA VACIA PERO CORRECTA ==========
        case 0: description = "Ok"; break;
        case 200: description = "El dato no existe"; break;

        // ========= NO PUEDE PASAR ==========

        // errores de usuarios
        case 10000: description = "Error en query login"; break;
        case 10001: description = "Error en query register"; break;
        case 10002: description = "Error en query registroEmpresa"; break;
        case 10003: description = "Error en query listaEmpresas"; break;
        case 10004: description = "Error en query puntuaEmpresa"; break;
        case 10005: description = "Error en query getInfoByID"; break;

    }

    var json = {
        codigo : errCode,
        mensaje : description
    };

    // Si hay data, se añadirá un campo al json llamado 'data', se devuelve entonces un JSON con la estructura {codigo,mensaje,data}
    if(data){
        json.data = data;
    }
    // El JSON que se devuelve
    return json
}

/**
 * Llama a la función response tras generar una estructura de error de código 0
 */
exports.responseOk = function(res, data){
    response(res,200,errCode(0,data));
};

/**
 * Llama a la función response tras generar una estructura de error de código de error,
 * si el error es menos de 10.000 se considerará error de tipo 'dato no existe', pero respuesta correcta (ver función errCode)
 */
exports.responseFail = function(res, err){
    console.log("responseFail");
    var httpError = err>=10000 ? 400 : 200;
    response(res,httpError,errCode(err,null));
};

/**
 * Llama a la función response con respuesta 401 tras generar una estructura de error de código de error
 */
exports.responseUnauth = function(res, err){
    response(res,401,errCode(err,null));
};

/**
 * Llama a la función response con respuesta 403 tras generar una estructura de error de código de error
 */
exports.responseForbidden = function(res, err){
    response(res,403,errCode(err,null));
};

/**
 * Función que invoca el objeto res y por tanto provoca la respuesta del servidor
 */
function response(res,status, data){
    res.status(status).json(data)
}
