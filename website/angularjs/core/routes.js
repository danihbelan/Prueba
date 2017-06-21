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

