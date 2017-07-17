/**
 * Created by danihbelan on 9/6/17.
 * Controlador del estado welcome
 */
(function () {
    function welcomeCtrl($http, $state) {
        var vm = this;
        vm.puntos = [1, 2, 3, 4, 5]


        $http.get('/users/listaEmpresas').then(
            function (responseOk) {
                vm.feedback = ''
                vm.listaEmpresas = responseOk.data.data
            }, function (responseFail) {
                vm.feedback = 'No hay empresas registradas'
            }
        )


        vm.puntuaEmpresa = function (id) {
            console.log('actualizando empresa ', id, ' con puntuacion ', vm.puntuacion[id])
            var datosPuntuacion = {id: id, puntuacion: vm.puntuacion[id]}
            $http.post('/users/puntuaEmpresa', datosPuntuacion).then(
                function (responseOk) {
                    console.log('Peticion correcta')
                }, function (responseFail) {
                    console.log('Peticion incorrecta')
                }
            )
        }


    }

    angular.module('miApp')
        .controller('welcomeCtrl', ['$http', '$state', welcomeCtrl]);

})();

