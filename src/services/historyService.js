/**
 * Created by byang1 on 6/6/16.
 */
angular.module('poster').service('historyService', function ($q, $rootScope, chromeStorage, urlService, EVENTS) {
  var self = this;

  self.add = (url, info)=>{
    return chromeStorage.add('urls', url).then(() => {
      return chromeStorage.add(url, JSON.stringify(info)).then((history)=> {
        $rootScope.$broadcast(EVENTS.NEW_HISTORY, history);
        return history;
      });
    });
  };

  self.get = function (url) {
    if (url) {
      // load url info
      var history = {url: url, urlInfo: urlService.parseUrl(url)};
      return chromeStorage.get(url).then(requests=> {
        history.requests = _.map(requests, request=> {
          request = JSON.parse(request);
          return request;
        });
        return history;
      });
    } else {
      // load all history
      return chromeStorage.get('urls').then(function (urls) {
        return $q.all(_.map(urls, url => {
          return self.get(url);
        }));
      });
    }
  };

  self.remove = function (url, info) {
    if (url && info) {
      return chromeStorage.remove(url, JSON.stringify(info));
    } else if (url) {
      return chromeStorage.remove(url).then(()=> chromeStorage.remove('urls', url));
    } else {
      // for clean history
      if (confirm('Are you sure?')) chromeStorage.get('urls').then(urls=> $q.all(_.map(urls, url=> self.remove(url))));
    }
  };
});