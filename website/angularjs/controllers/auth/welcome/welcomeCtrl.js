/**
 * Created by danihbelan on 9/6/17.
 * Controlador del estado welcome
 */
(function(){
    function welcomeCtrl($http, $state) {
        var vm = this;
        vm.puntuacion = []

        $http.get('/users/listaEmpresas').then(
            function (responseOk) {
                vm.listaEmpresas = responseOk.data
                console.log(vm.listaEmpresas)
            }, function (responseFail) {
                vm.empresas=['No hay empresas registradas']
            }
        )

        vm.puntuaEmpresa=function (id) {
            console.log('actualizando empresa ', id, ' con puntuacion ',vm.puntuacion[id])
            var datosPuntuacion={id: id, puntuacion: vm.puntuacion[id]}
            $http.post('/users/puntuaEmpresa', datosPuntuacion).then(
                function (responseOk) {
                    console.log('Peticion correcta')
                    $state.go('auth.welcome')
                }, function (responseFail) {
                    console.log('Peticion incorrecta')
                }
            )
        }


    }

    angular.module('miApp')
        .controller('welcomeCtrl', ['$http', '$state', welcomeCtrl]);

})();

