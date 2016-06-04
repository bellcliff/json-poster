(function () {
    'use static';

    angular.module('poster')
        .controller('PostCtrl', function ($scope, $http, historyService, EVENT_URL_SELECTED) {

            $scope.postInfo = {
                request: {},
                response: {}
            };

            $scope.$on(EVENT_URL_SELECTED, function (e, info) {
                $scope.postInfo = info;
            });

            $scope.getStatusClass = function () {
                if (!$scope.postInfo || !$scope.postInfo.response || !$scope.postInfo.response.status)
                    return '';
                var status = $scope.postInfo.response.status;
                if (status == 200) return 'label-success';
                if (status > 400) return 'label-danger';
                return 'label-info';
            };

            $scope.postData = function () {
                $scope.postInfo.response = {};
                var url = $scope.postInfo.request.url;
                var body = $scope.postInfo.request.body;
                if (!body || body.length == 0) body = '{}';

                $http.post(url, JSON.parse(body))
                    .then(function (data) {
                        $scope.postInfo.response = data;
                    })
                    .catch(function (data) {
                        $scope.postInfo.response = data;
                    });

                // add history
                historyService.url(url);
            }
        });
})();