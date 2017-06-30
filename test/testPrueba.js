/**
 * Created by danihbelan on 28/6/17.
 */
//Cabecera (importar archivos/funciones a testear y las interfaces de chai)
var expect = require('chai').expect
var query = require('../REST/routes/noAuth/query')


describe('Given two numbers', function() {
    it('compare both are equals', function () {
        var a = 1;
        var b = 1;
        expect(a).to.equal(b);

    })

})

describe('User', function() {
    it('login sin error', function (done) {
        var datosLogin={user: 'dani', password: 'dani'}
        query.login(datosLogin, done)

    })
})
