module.exports = function () {

    angular.module('poster')
        .service('chromeStorage', function () {
            var self = this;
            self.set = function (key, value) {
                return new Promise(resolve => {
                    var info = {};
                    info[key] = value;
                    chrome.storage.sync.set(info, data => {
                        console.log('storage save', key, value, data);
                        resolve(data);
                    });
                });
            };

            self.add = function (key, value) {
                return self.get(key).then(values => {
                    if (!values) values = [];
                    if (values.indexOf(value) != -1) return values;
                    values.push(value);
                    return self.set(key, values);
                });
            };

            self.get = function (key) {
                return new Promise(function (resolve) {
                    chrome.storage.sync.get(key, function (data) {
                        console.log('storage load', key, data);
                        resolve(data[key]);
                    });
                });
            };

            self.clear = () => {
                return new Promise(resolve => {
                    chrome.storage.sync.clear(function () {
                        resolve();
                    });
                });
            };

            self.remove = (key, value) => {
                return new Promise(resolve=> {
                    if (value)
                        return self.get(key).then(values=> {
                            values.splice(values.indexOf(value), 1);
                            return self.set(key, values);
                        });
                    else
                        chrome.storage.sync.remove(key, function (data) {
                            resolve(data);
                        });
                });
            };
        })
        .service('historyService', function (chromeStorage, $q) {
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
                        return chromeStorage.add(url, info);
                    });
                } else if (url) {
                    // load url info
                    return chromeStorage.get(url);
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
};