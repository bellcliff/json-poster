
angular.module('poster', ['ui.router'])
    .constant('EVENT_URL_SELECTED', 'event_url_selected')
    .run(function ($http) {
        // set default headers
        $http.defaults.headers.common['Content-Type'] = 'application/vnd.americanexpress.req-v1+json';
    })
    .config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('');
        $stateProvider
            .state('index', {
                url: '',
                views: {
                    history: {
                        templateUrl: 'components/history/template.html',
                        controller: 'HistoryCtrl'
                    },
                    post: {
                        templateUrl: 'components/post/template.html',
                        controller: 'PostCtrl'
                    }
                }
            })
    })
