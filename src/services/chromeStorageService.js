/**
 * Created by byang1 on 6/6/16.
 */
angular.module('poster')
    .service('chromeStorage', function () {
        var self = this;
        self.set = (key, value) => {
            return new Promise(resolve => {
                var info = {};
                info[key] = value;
                chrome.storage.sync.set(info, data => {
                    console.log('storage save', key, value, data);
                    resolve(data);
                });
            });
        };

        self.add = (key, value) => {
            return self.get(key).then(values => {
                if (!values) values = [];
                if (values.indexOf(value) != -1) return values;
                values.push(value);
                return self.set(key, values);
            });
        };

        self.get = key => {
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
    });