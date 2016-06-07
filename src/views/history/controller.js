module.exports = function ($scope, $rootScope, historyService, chromeStorage, urlService, EVENT_URL_SELECTED) {
    historyService.history().then(histories=> {
        $scope.historyInfo = histories;
        console.info($scope.historyInfo[0].urlInfo);
        $scope.$digest();
    });

    $scope.select = function (url, request, event) {
        // stop pop event
        if (event) event.stopPropagation();
        $rootScope.$broadcast(EVENT_URL_SELECTED, {url: url, body: request.body});
    };

    $scope.remove = function (url, event) {
        if (event) event.stopPropagation();
        if (!url) chromeStorage.clear();
        else historyService.removeUrl(url);
    };

    $rootScope.$on('HISTORY_UPDATE', function (e, history) {
        $scope.historyInfo.push(history);
    });
};