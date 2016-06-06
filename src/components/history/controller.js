module.exports = function ($scope, $rootScope, historyService, EVENT_URL_SELECTED) {

    historyService.url().then(urls=> {
        $scope.urls = urls;
    });

    $scope.select = function (url) {
        $rootScope.$broadcast(EVENT_URL_SELECTED, {request: {url: url}});
    };

    $scope.remove = function (url) {
        historyService.removeUrl(url);
    };
};