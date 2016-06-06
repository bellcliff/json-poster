module.exports = function ($scope, $rootScope, historyService, chromeStorage, EVENT_URL_SELECTED) {
    historyService.history().then(histories=> {
        $scope.historyInfo = histories;
        $scope.$digest();
    });

    $scope.select = function (info, event) {
        if (event) event.stopPropagation();
        $rootScope.$broadcast(EVENT_URL_SELECTED, angular.copy(info));
    };

    $scope.remove = function (url) {
        if (!url) chromeStorage.clear();
        else historyService.removeUrl(url);
    };

    $rootScope.$on('HISTORY_UPDATE', function(e, history){
        $scope.historyInfo.push(history);
    });
};