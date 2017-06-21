/**
 * Created by danihbelan on 9/6/17.
 */
angular.module('miApp', [
    'ui.router',
    'ngMaterial'
]);

/**
 * Created by danihbelan on 9/6/17.
 * En este archivo de definen cada uno de los estados.
 * Se distingiran entre los estados de la parte autorizada y la no autorizada
 * Ademas se definiran estados abstractos los cuales seran padre de los estados hijos
 * Los estados hijos se definen con el nombre: 'estadoPadre.estadoHijo'
 *
 * Por cada estado debemos definir el controlador y el jade correspondiente.
 * Y definir la ruta en el archivo templates
 *
 * IMPORTANTE: Las directivas deben definirse tanto en la función como abajo en el .config([...])
 *
 * Los controladores ademas interceptan las rutas de forma que si el servidor no encuentra una
 * coincidencia con sus rutas estas
 */

(function(){
    function routes($stateProvider, $urlRouterProvider, $locationProvider){

        $locationProvider.html5Mode(true);  //Esta linea hay que ponerla por la documentación

        $stateProvider
            /*.state('index', {
                url:"/",
                templateUrl: '/temp/index',
                controller: 'indexCtrl',
                controllerAs: 'in'
            })*/

            //Definimos el estado abstracto padre noAuth
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


            //Definimos el estado abstracto padre Auth
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
 * Controlador del indexAuth
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
 * Controlador del estado welcome
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

