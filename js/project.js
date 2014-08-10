

angular.module('feedModule', [])
.controller('FeedController', function ($scope, $http) {
  $scope.feed = {};
  $scope.status = '';
  $scope.showDetour = false;
  var responsePromise = $http.get("http://trimethelper.balajiathreya.com/getdashboard");

  responsePromise.success(function(data, status, headers, config) {
    $scope.status = 'Status : Success';
    $scope.feed = data;
  });

  responsePromise.error(function(data, status, headers, config) {
    $scope.status = "Status : No data. Server returned response status: " + status;
    $scope.feed = data;
  });

  $scope.getMinutes = function(arrivaldate){
    diff = new Date() - arrivaldate;
    millisdiff = Math.abs(diff);
    return Math.round( millisdiff / 60000 );
  };

  $scope.getDetourInfo = function(detour, detours){
    id = detour[0];
    return detours[id];
  };
  
  $scope.toggleShowDetour = function(){
    $scope.showDetour = !$scope.showDetour;
  };
});
