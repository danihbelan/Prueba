/**
 * Created by danihbelan on 14/7/17.
 */

exports.codigoSchema = {
    //"$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
        "id": {
            "type": "integer"
        },
        "puntuacion": {
            "type": "integer"
        }
    },
    "required": [
        "id",
        "puntuacion"
    ]
};
