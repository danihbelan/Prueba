/**
 * Created by danihbelan on 9/6/17.
 * Controlador del indexNoAuth
 */
(function(){
    function indexCtrl() {
        var vm = this;
        console.log('Estamos en indexNoAuthCtrl')
    }

    angular.module('miApp')
        .controller('indexCtrl', [indexCtrl]);

})();

