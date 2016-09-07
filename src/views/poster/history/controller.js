module.exports = function ($scope, $rootScope, historyService, chromeStorage, urlService, EVENTS) {
    var updateHistory = function(){
        historyService.get().then(histories=> {
            console.log('histories updated', histories);
            $scope.updatedTime = new Date();
            $scope.histories = histories;
            $scope.$digest();
        });
    };
    updateHistory();

    $scope.selectOrDelete = function (event, url, body) {
        // stop pop event
        event.stopPropagation();
        if (event.altKey) {
            // delete
            $scope.remove(url, body);
        } else
            $rootScope.$broadcast(EVENTS.URL_SELECTED, {url: url, body: body});
    };

    $scope.remove = function (url, body) {
        historyService.remove(url, body).then(updateHistory);
    };

    $rootScope.$on(EVENTS.NEW_HISTORY, function (e, history) {
        console.log('on new history', history);
        $scope.histories.push(history);
    });
};