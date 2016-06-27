module.exports = function ($scope, $http, $filter, historyService, EVENT_URL_SELECTED) {

    $scope.$on(EVENT_URL_SELECTED, function (e, info) {
        $scope.url = info.url;
        $scope.body = $filter('json')(info.body, 4);
    });

    $scope.getStatusClass = function () {
        if (!$scope.response || !$scope.response.status)
            return '';
        var status = $scope.response.status;
        if (status == 200) return 'label-success';
        if (status > 400) return 'label-danger';
        return 'label-info';
    };

    $scope.postData = function () {
        var body = $scope.body;
        if (!body || body.length === 0) body = '{}';

        var postBody = JSON.parse(body);
        $http.post($scope.url, postBody)
            .then(function (data) {
                delete $scope.err;
                $scope.response = data;
                // historyService.history($scope.url, {body: postBody, resp: data.data});
                historyService.history($scope.url, {body: postBody});
            })
            .catch(function (err) {
                delete $scope.response;
                $scope.err = err;
            });

        historyService.url($scope.url);
    };
};