/**
 * Created by byang1 on 6/6/16.
 */
angular.module('poster').service('historyService', function ($q, $rootScope, chromeStorage, urlService, EVENTS) {
  var self = this;

  self.url = url => {
    return url ? chromeStorage.add('urls', url) : chromeStorage.get('urls');
  };

  self.removeUrl = function (url) {
    return chromeStorage.remove('urls', url);
  };

  self.history = function (url, info) {
    if (url && info) {
      // add url and history
      return self.url(url).then(() => {
        return chromeStorage.add(url, JSON.stringify(info)).then((history)=> {
          $rootScope.$broadcast(EVENTS.NEW_HISTORY, history);
          return history;
        });
      });
    } else if (url) {
      // load url info
      var requestInfo = {url: url, urlInfo: urlService.parseUrl(url)};
      return chromeStorage.get(url).then(requests=> {
        requestInfo.requests = _.map(requests, request=> {
          request = JSON.parse(request);
          return request;
        });
        return requestInfo;
      });
    } else {
      // load all history
      return self.url().then(function (urls) {
        return $q.all($.map(urls, url => {
          return self.history(url);
        }));
      });
    }
  };

  self.removeHistory = function (url) {
    if (url) {
      return chromeStorage.remove(url).then(()=> {
        return chromeStorage.remove('urls', url);
      });
    } else {
      return self.url().then(urls=> {
        return $q.all($.map(urls, url => {
          return self.removeHistory(url);
        }));
      });
    }
  };
});