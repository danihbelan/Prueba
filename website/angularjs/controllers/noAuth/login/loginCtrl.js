/**
 * Created by danihbelan on 9/6/17.
 * Controlador del login
 */
(function(){
    //Añadir directivas al final!!
    function loginCtrl($http, $state) {
        //La variable vm definen el objeto del controlador
        //de forma que se puede usar en el jade correspondiente
        //a partir del alias
        var vm = this;

        vm.login=function () {
            console.log('Entro en login')
            var datosLogin={user: vm.user, password: vm.password}

            //La directiva $http permite hacer operaciones HTTP al servidor
            //En este caso hacemos un post a la ruta /login
            //Con then hacemos un Promise (funcion parecida al callback para controlar la asincronía)
            $http.post('/login', datosLogin).then(
                function (responseOk) {
                    console.log('Login correcto')
                    //Cambiamos de estado con state.go
                    $state.go('auth.welcome')
                }, function (responseFail) {
                    console.log('Login incorrecto')
                }
            )
        }
    }


    angular.module('miApp')
        .controller('loginCtrl', ['$http', '$state', loginCtrl]);

})();

