/**
 * Created by danihbelan on 9/6/17.
 */
(function(){
    function loginCtrl($http, $state) {
        var vm = this;

        vm.login=function () {
            console.log('Entro en login')
            var datosLogin={user: vm.user, password: vm.password}
            $http.post('/login', datosLogin).then(
                function (responseOk) {
                    console.log('Login correcto')
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

