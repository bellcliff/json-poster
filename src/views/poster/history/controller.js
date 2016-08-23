module.exports = function ($scope, $rootScope, historyService, chromeStorage, urlService, EVENTS) {
    var updateHistory = function(){
        historyService.history().then(histories=> {
            console.log('histories updated', histories);
            $scope.updatedTime = new Date();
            $scope.historyInfo = histories;
            $scope.$digest();
        });
    };
    updateHistory();

    $scope.select = function (event, url, body) {
        // stop pop event
        event.stopPropagation();
        $rootScope.$broadcast(EVENTS.URL_SELECTED, {url: url, body: body});
    };

    $scope.remove = function (url, event) {
        if (event) event.stopPropagation();
        if (!url) chromeStorage.clear().then(()=>updateHistory());
        else historyService.removeUrl(url).then(()=>updateHistory());
    };

    $rootScope.$on(EVENTS.NEW_HISTORY, function (e, history) {
        console.log('on new history', history);
        $scope.historyInfo.push(history);
    });
};