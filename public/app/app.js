(function () {

    var app = angular.module('app', ['ngRoute', 'ui.router']);

    app.config(appConfig);

    appConfig.$inject = ["$routeProvider", '$logProvider', '$stateProvider', '$urlRouterProvider'];

    function appConfig($routeProvider, $logProvider, $stateProvider, $urlRouterProvider) {

        $logProvider.debugEnabled(true);

        // $routeProvider
        //     .when('/', {
        //         controller: 'HomeController',
        //         controllerAs: 'home',
        //         templateUrl: 'app/templates/home.html'
        //     })
        //     .when('/schools', {
        //         controller: 'AllSchoolsController',
        //         controllerAs: 'schools',
        //         templateUrl: '/app/templates/allSchools.html',
        //         caseInsensitiveMatch: true
        //     })
        //     .when('/classrooms', {
        //         controller: 'AllClassroomsController',
        //         controllerAs: 'classrooms',
        //         templateUrl: '/app/templates/allClassrooms.html'
        //     })
        //     .when('/activities', {
        //         controller: 'AllActivitiesController',
        //         controllerAs: 'activities',
        //         templateUrl: '/app/templates/allActivities.html',
        //         resolve: {
        //             activities: function (dataService) {
        //                 return dataService.getAllActivities();
        //             }
        //         }
        //     })
        //     .when('/classrooms/:id', {
        //         controller: 'ClassroomController',
        //         controllerAs: 'classroom',
        //         templateUrl: '/app/templates/classroom.html'
        //     })
        //     .when('/classrooms/:id/detail/:month?', {
        //         controller: 'ClassroomController',
        //         controllerAs: 'classroom',
        //         templateUrl: '/app/templates/classroomDetail.html'
        //     })
        //     .otherwise('/');

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                controller: 'HomeController',
                controllerAs: 'home',
                templateUrl: 'app/templates/home.html'
            })
            .state('schools', {
                url: '/schools',
                controller: 'AllSchoolsController',
                controllerAs: 'schools',
                templateUrl: '/app/templates/allSchools.html'
            })
            .state('classrooms', {
                url: '/classrooms',
                controller: 'AllClassroomsController',
                controllerAs: 'classrooms',
                templateUrl: '/app/templates/allClassrooms.html',
                onEnter: function ($log) {
                    $log.debug('Entering the classrooms state.');
                },
                onExit: function ($log) {
                    $log.debug('Exiting the classrooms state.');
                }
            })
            .state('activities', {
                url: '/activities',
                controller: 'AllActivitiesController',
                controllerAs: 'activities',
                templateUrl: '/app/templates/allActivities.html',
                resolve: {
                    activities: function (dataService) {
                        return dataService.getAllActivities();
                    }
                },
                data: {
                    name: 'My Activity',
                    desc: 'Fun'
                },
                foo: {
                    myFoo: 'bar'
                }
            })
            .state('classroom_parent', {
                abstract: true,
                url: '/classrooms/:id',
                templateUrl: '/app/templates/classroom_parent.html',
                controller: 'ClassroomController',
                controllerAs: 'classroom',
                params: {
                    classroomMessage: { value: 'Learning is fun!' }
                }
            })
            .state('classroom_parent.classroom_summary', {
                url: '/summary',
                views: {
                    'classInfo': {
                        templateUrl: '/app/templates/classroom.html',
                        controller: 'ClassroomSummaryController',
                        controllerAs: 'classroomSummary'
                    },
                    'classMessage': {
                        templateUrl: '/app/teamplates/classroom_message.html',
                        controller: 'ClassroomMessageController',
                        controllerAs: 'classroomMessage'
                    }
                }
            })
            .state('classroom_parent.classroom_detail', {
                url: '/detail/{month}',
                views: {
                    'classInfo': {
                        templateUrl: '/app/templates/classroomDetail.html'
                    }
                }
            })
    }

    app.run(['$rootScope', '$log', function ($rootScope, $log) {

        // $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        //     $log.debug('successfully changed routes');

        //     $log.debug(event);
        //     $log.debug(current);
        //     $log.debug(previous);

        // });

        // $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
        //     $log.debug('error changing routes');

        //     $log.debug(event);
        //     $log.debug(current);
        //     $log.debug(previous);

        // });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $log.debug('successfully changed states');

            $log.debug('event', event);
            $log.debug('toState', toState);
            $log.debug('toParams', toParams);
            $log.debug('fromState', fromState);
            $log.debug('fromParams', fromParams);
        });

        $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
            $log.error('The requested state was not found: ', unfoundState);
        });

    }])

} ());