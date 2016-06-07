angular.module('poster', ['ui.router'])

    .constant('EVENT_URL_SELECTED', 'event_url_selected')

    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('');

        $stateProvider
            .state('index', {
                url: '',
                views: {
                    history: {
                        template: require('html!./components/history/template.html'),
                        controller: require('./components/history/controller'),
                        controllerAs: 'history'
                    },
                    post: {
                        template: require('html!./components/post/template.html'),
                        controller: require('./components/post/controller'),
                    }
                }
            });
    })

    .run(function ($http) {
        $http.defaults.headers.post['Content-Type'] = 'application/vnd.americanexpress.req-v1+json';
    });

require('./directives/expandable/directive')();
require('./services/chromeStorageService');
require('./services/historyService');