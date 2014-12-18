

angular.module('feedModule', [])
.controller('FeedController', function ($scope, $http, geolocation) {
  $scope.feed = {};
  $scope.status = '';
  coords = geolocation.getLocation().then(function(data){
      return {lat:data.coords.latitude, long:data.coords.longitude};
  });
  var favLocsResponsePromise = $http.get("http://trimethelper.balajiathreya.com/getfavoritelocs", { 
					params : { 
						"locids" : "1003,1114,9978,10168,9833,9834,8381,9818"
					 }
				 });

  favLocsResponsePromise.success(function(data, status, headers, config) {
    $scope.status = 'Status : Success';
    $scope.feed = data;
    for(i in $scope.feed.arrivals){
      $scope.feed.arrivals[i].showDetour = true;
    }
  });

  favLocsResponsePromise.error(function(data, status, headers, config) {
    $scope.status = "Status : No data. Server returned response status: " + status;
    $scope.feed = data;
  });

  $scope.getMinutes = function(arrivaldate){
    diff = new Date() - arrivaldate;
    millisdiff = Math.abs(diff);
    return Math.round( millisdiff / 60000 );
  };


 


  
});
