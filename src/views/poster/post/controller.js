module.exports = function ($scope, $http, $filter, historyService, EVENTS) {

  $scope.$on(EVENTS.URL_SELECTED, function (e, info) {
    $scope.url = info.url;
    if (info.body)
      $scope.body = $filter('json')(info.body, 4);
  });

  $scope.postTypes = [{
    label: 'AMEX',
    value: 'application/vnd.americanexpress.req-v1+json'
  }, {
    label: 'JSON',
    value: 'application/json'
  }];

  $scope.selectedType = $scope.postTypes[0];

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
    $http.post($scope.url, postBody, {
        headers: {
          'Content-Type': $scope.selectedType.value
        }
      })
      .then(function (data) {
        $scope.response = data;
        historyService.add($scope.url, {body: postBody});
      })
      .catch(function (err) {
        $scope.response = err;
      });

    historyService.url($scope.url);
  };
};