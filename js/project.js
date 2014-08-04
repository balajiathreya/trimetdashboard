var feeds = [];
  
angular.module('feedModule', ['ngResource','ngSanitize'])
  .factory('FeedLoader', function ($resource) {
    return $resource('http://ajax.googleapis.com/ajax/services/feed/load', {}, {
      fetch: { method: 'JSONP', params: {v: '1.0', callback: 'JSON_CALLBACK'} }
    });
  })
  .factory('FeedList', function ($rootScope, FeedLoader) {
    return function(zipcode) {
      var feedSources = [
        {title: 'Fandango', url: 'http://www.fandango.com/rss/moviesnearme_'+zipcode+'.rss'}
      ];
      if (feeds.length === 0) {
        for (var i=0; i<feedSources.length; i++) {
          FeedLoader.fetch({q: feedSources[i].url, num: 10}, {}, function (data) {
            var feed = data.responseData.feed;
            feeds.push(feed);
          });
        }
      }
      return feeds;
    };
  })
  .factory('RTRatings', function ($rootScope, FeedLoader) {
    return function(zipcode) {
      var feedSources = [
        {title: 'Fandango', url: 'http://www.fandango.com/rss/moviesnearme_'+zipcode+'.rss'}
      ];
      if (feeds.length === 0) {
        for (var i=0; i<feedSources.length; i++) {
          FeedLoader.fetch({q: feedSources[i].url, num: 10}, {}, function (data) {
            var feed = data.responseData.feed;
            feeds.push(feed);
          });
        }
      }
      return feeds;
    };
  })
  .controller('FeedController', function ($scope, FeedList, RTRatings) {
    this.zipCode = '';
    this.zipCodeSubmit = function(){
      $scope.feeds = new FeedList(this.zipCode);
      $scope.$on('FeedList', function (event, data) {
        $scope.feeds = data;
      }); 
    };    
  });