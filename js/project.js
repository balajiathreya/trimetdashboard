

angular.module('feedModule', [])
.controller('FeedController', function ($scope, $http) {
  $scope.favStops = {};
  $scope.nearbyStops = {};
  $scope.favStopsStatus = '';
  $scope.nearbyStopsStatus = '';
/*
  coords = geolocation.getLocation().then(function(data){
      return {lat:data.coords.latitude, long:data.coords.longitude};
  });

  // nearby locations
  var nearbyStopsResponsePromise = $http.get("http://trimethelper.balajiathreya.com/getnearbystops", {
                                        params : {
                                                "ll" : coords.long+","+coords.lat
                                         }
                                 });

  nearbyStopsResponsePromise.success(function(data, status, headers, config) {
    $scope.nearbyStopsStatus = 'Status : Success';
    $scope.nearbyStops = data;
    for(i in $scope.nearbyStops.arrivals){
      $scope.nearbyStops.arrivals[i].showDetour = true;
    }
  });

  nearbyStopsResponsePromise.error(function(data, status, headers, config) {
    $scope.nearbyStopsStatus = "Status : No data. Server returned response status: " + status;
    $scope.nearbyStops = data;
  });

*/

  // favorite locations 
  var favLocsResponsePromise = $http.get("http://trimethelper.balajiathreya.com/getfavoritelocs", { 
					params : { 
						"locids" : "1003,1114,9978,10168,9833,9834,8381,9818"
					 }
				 });

  favLocsResponsePromise.success(function(data, status, headers, config) {
    $scope.favStopsStatus = 'Status : Success';
    $scope.favStops = data;
    for(i in $scope.favStops.arrivals){
      $scope.favStops.arrivals[i].showDetour = true;
    }
  });

  favLocsResponsePromise.error(function(data, status, headers, config) {
    $scope.favStopsStatus = "Status : No data. Server returned response status: " + status;
    $scope.favStops = data;
  });

  $scope.getMinutes = function(arrivaldate){
    diff = new Date() - arrivaldate;
    millisdiff = Math.abs(diff);
    return Math.round( millisdiff / 60000 );
  };


 


  
});
