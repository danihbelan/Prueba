/**
 * Created by danihbelan on 9/6/17.
 */
angular.module('miApp', [
    'ui.router',
    'ngMaterial',
    'satellizer'
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
    function routes($stateProvider, $urlRouterProvider, $locationProvider, $authProvider){

        $locationProvider.html5Mode(true);  //Esta linea hay que ponerla por la documentación

        //La directica $authProvaider permite encapsular todas las peticiones con una cabecera que incluya la
        //autenticacion
        $authProvider.httpInterceptor = function() { return true; };
        $authProvider.withCredentials = false;
        $authProvider.tokenRoot = null;
        $authProvider.baseUrl = '/';
        $authProvider.loginUrl = '/login';
        $authProvider.tokenName = 'token';
        $authProvider.tokenPrefix = 'satellizer';
        $authProvider.tokenHeader = 'Authorization';
        $authProvider.tokenType = 'Bearer';
        $authProvider.storageType = 'localStorage'; //Define donde se guarda el token en el navegador del cliente

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
                templateUrl: '/tempNoAuth/indexNoAuthTemp'
            })

            .state('noAuth.login', {
                url:"/",
                templateUrl: '/tempNoAuth/loginTemp',
                controller: 'loginCtrl',
                controllerAs: 'lc'
            })

            .state('noAuth.registro', {
                url:"/registro",
                templateUrl: '/tempNoAuth/registroTemp',
                controller: 'registroCtrl',
                controllerAs: 'rc'
            })


            //Definimos el estado abstracto padre Auth
            .state('auth', {
                abstract: true,
                templateUrl: '/tempAuth/indexAuthTemp'
            })

            .state('auth.welcome', {
                url:"/welcome",
                templateUrl: '/tempAuth/welcomeTemp',
                controller: 'welcomeCtrl',
                controllerAs: 'wc'
            })

            .state('auth.formulario', {
                url:"/registroEmpresa",
                templateUrl: '/tempAuth/registroEmpresaTemp',
                controller: 'formularioCtrl',
                controllerAs: 'fc'
            })
    }

    angular.module('miApp')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$authProvider', routes])

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
    function loginCtrl($http, $state, $auth) {
        //La variable vm definen el objeto del controlador
        //de forma que se puede usar en el jade correspondiente
        //a partir del alias
        var vm = this;

        vm.login=function () {
            console.log('Entro en login')
            var datosLogin={user: vm.user, password: vm.password}

            //La directiva $http permite hacer operaciones HTTP al servidor (Ya no usamos esta!!)
            //La directiva auth encapsula la operacion HTTP y permite hacer la autenticacion para obtener el token
            //En este caso hacemos un post a la ruta /login
            //Con then hacemos un Promise (funcion parecida al callback para controlar la asincronía)
            $auth.login(datosLogin).then(
                function (responseOk) {
                    console.log('Login correcto', responseOk)
                    //Cambiamos de estado con state.go
                    $state.go('auth.welcome')
                }, function (responseFail) {
                    console.log('Login incorrecto')
                }
            )
        }
    }


    angular.module('miApp')
        .controller('loginCtrl', ['$http', '$state', '$auth', loginCtrl]);

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
        vm.feedback=''

        vm.registro=function () {

            var datosRegistro={user: vm.user, password: vm.password}
            //La directiva $http permite hacer operaciones HTTP al servidor
            //En este caso hacemos un post a la ruta /resistro
            //Con then hacemos un Promise (funcion parecida al callback para controlar la asincronía)
            $http.post('/registro', datosRegistro).then(
                function (responseOk) {
                    console.log('Registro correcto')
                    vm.feedback='Usuario registrado con exito'
                }, function (responseFail) {
                    console.log('Registro incorrecto')
                    vm.feedback='Usuario ya registrado'
                }
            )
        }
    }

    angular.module('miApp')
        .controller('registroCtrl', ['$http', registroCtrl]);

})();

