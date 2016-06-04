System.defaultJSExtensions = true;
System.config({
    meta: {
        'jquery': {
            format: 'global',
            exports: 'jquery'
        },
        'angular': {
            format: 'global',
            exports: 'angular',
            deps: ['jquery']
        },
        'uiRouter': {
            format: 'global',
            exports: 'uiRouter',
            deps: ['angular']
        },
        'app': {
            deps: ['uiRouter']
        }
    },
    map: {
        jquery: 'assets/js/jquery.min.js',
        angular: 'assets/js/angular.min.js',
        uiRouter: 'assets/js/angular-ui-router.min.js'
    }
});
System.import('app');