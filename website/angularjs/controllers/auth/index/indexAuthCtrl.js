/**
 * Created by danihbelan on 9/6/17.
 */
(function(){
    function indexCtrl() {
        var vm = this;
        console.log('Estamos en indexAuthCtrl')
    }

    angular.module('miApp')
        .controller('indexCtrl', [indexCtrl]);

})();

