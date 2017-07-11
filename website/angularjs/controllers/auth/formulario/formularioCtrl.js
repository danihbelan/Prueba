/**
 * Created by danihbelan on 9/6/17.
 * Controlador del estado formulario
 */
(function(){
    function formularioCtrl($http) {
        var vm = this;
        vm.empresa=''

        vm.registroEmpresa=function () {
            var datosRegistro={empresa: vm.empresa}
            //La directiva $http permite hacer operaciones HTTP al servidor
            //En este caso hacemos un post a la ruta /resistroEmpresa
            //Con then hacemos un Promise (funcion parecida al callback para controlar la asincronía)
            $http.post('/users/registroEmpresa', datosRegistro).then(
                function (responseOk) {
                    console.log('Registro correcto')
                    vm.feedback='Empresa registrada con exito'
                }, function (responseFail) {
                    console.log('Registro incorrecto')
                    vm.feedback='Empresa ya registrada'
                }
            )
        }


    }

    angular.module('miApp')
        .controller('formularioCtrl', ['$http', formularioCtrl]);

})();

