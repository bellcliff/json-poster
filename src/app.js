angular.module('poster', ['ui.router'])

    .constant('EVENTS', {
      URL_SELECTED: 'URL_SELECTED',
      NEW_HISTORY: 'NEW_HISTORY'
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('');
        $stateProvider
            .state('poster', _.extend({url: ''}, require('./views/poster/router')));
    })

    .run(function ($http, $state) {
        $http.defaults.headers.post['Content-Type'] = 'application/vnd.americanexpress.req-v1+json';
        $state.go('poster');
    });

require('./directives/expandable')();
require('./services/urlService');
require('./services/chromeStorageService');
require('./services/historyService');