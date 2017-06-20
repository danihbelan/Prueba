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

