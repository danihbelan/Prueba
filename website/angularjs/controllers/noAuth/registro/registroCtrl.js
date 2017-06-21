/**
 * Created by danihbelan on 9/6/17.
 * Controlador del registro
 */
(function(){
    //Añadir directivas al final!!
    function registroCtrl($http) {
        var vm = this;
        vm.user=''
        vm.password=''

        vm.registro=function () {

            var datosRegistro={user: vm.user, password: vm.password}
            //La directiva $http permite hacer operaciones HTTP al servidor
            //En este caso hacemos un post a la ruta /resistro
            //Con then hacemos un Promise (funcion parecida al callback para controlar la asincronía)
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

