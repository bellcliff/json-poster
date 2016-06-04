(function () {
    'use static'

    angular.module('poster')
        .controller('HistoryCtrl', function ($scope, historyService, EVENT_URL_SELECTED) {

            historyService.url().then(urls=> {
                $scope.urls = urls;
            });

            $scope.select = function (url) {
                $scope.$broadcast(EVENT_URL_SELECTED, {request: {url: url}})
            }
        });
});