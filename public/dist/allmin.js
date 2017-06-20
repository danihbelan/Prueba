/**
 * Created by danihbelan on 9/6/17.
 */
angular.module('miApp', [
    'ui.router',
    'ngMaterial'
]);

/**
 * Created by danihbelan on 9/6/17.
 */

(function(){
    function routes($stateProvider, $urlRouterProvider, $locationProvider){

        $locationProvider.html5Mode(true);

        $stateProvider
            /*.state('index', {
                url:"/",
                templateUrl: '/temp/index',
                controller: 'indexCtrl',
                controllerAs: 'in'
            })*/

            .state('noAuth', {
                abstract: true,
                templateUrl: '/temp/indexNoAuthTemp'
            })

            .state('noAuth.login', {
                url:"/",
                templateUrl: '/temp/loginTemp',
                controller: 'loginCtrl',
                controllerAs: 'lc'
            })

            .state('noAuth.registro', {
                url:"/registro",
                templateUrl: '/temp/registroTemp',
                controller: 'registroCtrl',
                controllerAs: 'rc'
            })


            .state('auth', {
                abstract: true,
                templateUrl: '/temp/indexAuthTemp'
            })

            .state('auth.welcome', {
                url:"/welcome",
                templateUrl: '/temp/welcomeTemp',
                controller: 'welcomeCtrl',
                controllerAs: 'wc'
            })
    }

    angular.module('miApp')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', routes])

})();


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


/**
 * Created by danihbelan on 9/6/17.
 */
(function(){
    function welcomeCtrl($http) {
        var vm = this;

    }


    angular.module('miApp')
        .controller('welcomeCtrl', ['$http', welcomeCtrl]);

})();


/**
 * Created by danihbelan on 9/6/17.
 */
(function(){
    function indexCtrl() {
        var vm = this;
        console.log('Estamos en indexNoAuthCtrl')
    }

    angular.module('miApp')
        .controller('indexCtrl', [indexCtrl]);

})();


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

