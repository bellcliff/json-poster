/**
 * Created by byang1 on 6/6/16.
 */
angular.module('poster').service('historyService', function (chromeStorage, $q) {
    var self = this;

    self.url = url => {
        return url ? chromeStorage.add('urls', url) : chromeStorage.get('urls');
    };

    self.removeUrl = function (url) {
        return chromeStorage.remove('urls', url);
    };

    self.history = function (url, info) {
        if (url && info) {
            delete info.request.url;
            // add url and history
            return self.url(url).then(() => {
                return chromeStorage.add(url, JSON.stringify(info));
            });
        } else if (url) {
            // load url info
            var info = JSON.parse(chromeStorage.get(url));
            info.request.url = url;
            return info;
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