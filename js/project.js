var feeds = [];

angular.module('feedModule', [])
.controller('FeedController', function ($scope, $http) {
  $scope.feed = {};
  $scope.status = '';
  var responsePromise = $http.get("http://trimethelper.balajiathreya.com/getdashboard");

  responsePromise.success(function(data, status, headers, config) {
    $scope.status = 'Status : Success';
    $scope.feed = data;
  });

  responsePromise.error(function(data, status, headers, config) {
    $scope.status = "Status : No data. Server returned response status: " + status;
    $scope.feed = data;
  });

});
