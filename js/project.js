
angular.module('feedModule', [])
.controller('FeedController', function ($scope, $http) {
  $scope.favStops = {};
  $scope.nearbyStops = {};

  $scope.favLocIDs = "1003,1114,9978,10168,9833,9834,8381,9818";
  $scope.nearbyLocIDS = '';
 // $scope.tab = 1;

  getGeoLocation($scope.lon, $scope.lat);
  getFavLocIDsRoutes($scope.favLocIDs);


  $scope.setTab = function (tabId) {
     $scope.tab = tabId;
  };

  $scope.isSetTab = function (tabId) {
     return $scope.tab === tabId;
  };
// getRoutes(getNearbyLocIDs(),$scope.nearbyStopsStatus, $scope.nearbyStops);
   
  function getGeoLocation() {
     $scope.tab = 1;
     if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
                lat = position.coords.latitude;
                lon = position.coords.longitude;
		getNearbyStops(lon, lat);
        });
     }    
  }


  function getNearbyStops(lon, lat) {
      var responsePromise = $http.get("http://trimethelper.balajiathreya.com/getnearbystops", {
                                        params : {
                                                "ll" : lon+","+lat
                                         }
                                 });

       responsePromise.success(function(data, status, headers, config) {
           $scope.nearbyStops = data;
           for(i in $scope.nearbyStops.arrivals) {
              $scope.nearbyStops.arrivals[i].showDetour = true;
           }
       });

       responsePromise.error(function(data, status, headers, config) {
           console.log('error: ' + data + " status: " + status);
           $scope.nearbyStops = data;
       });

   };

   function getNearbyLocIDs() {
       nearbylocids = [];
       for (i in $scope.nearbyStops.locations) {
           loc = $scope.nearbyStops.locations[i];
	   nearbylocids.push(loc.locid);
       }
       return nearbylocids;
   }

   function getFavLocIDsRoutes(locids){
       var responsePromise = $http.get("http://trimethelper.balajiathreya.com/getfavoritestops", {
                                        params : {
                                                "locids" : locids
                                         }
                                 });

       responsePromise.success(function(data, status, headers, config) {
           $scope.favStops = data;
           for(i in $scope.favStops.arrivals) {
              $scope.favStops.arrivals[i].showDetour = true;
           }
       });

       responsePromise.error(function(data, status, headers, config) {
	   console.log('error: ' + data + " status: " + status);
           $scope.favStops = data;
       });
   }


  $scope.getMinutes = function(arrivaldate){
    diff = new Date() - arrivaldate;
    millisdiff = Math.abs(diff);
    return Math.round( millisdiff / 60000 );
  };
});
