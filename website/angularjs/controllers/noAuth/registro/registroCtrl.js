/**
 * Created by danihbelan on 9/6/17.
 */
(function(){
    function registroCtrl($http) {
        var vm = this;
        vm.user=''
        vm.password=''

        vm.registro=function () {

            var datosRegistro={user: vm.user, password: vm.password}
            $http.post('/registro', datosRegistro).then(
                function (responseOk) {
                    console.log('Registro correcto')
                }, function (responseFail) {
                    console.log('Registro incorrecto')
                }
            )
        }
    }

    angular.module('miApp')
        .controller('registroCtrl', ['$http', registroCtrl]);

})();

