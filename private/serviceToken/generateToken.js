/**
 * Created by danihbelan on 22/6/17.
 */
var jwt = require('jwt-simple');

function generateToken(id) {

    var payload = {id: id};
    var secret = 'mipass';


    var token = jwt.encode(payload, secret);
    return token
}

module.exports=generateToken

