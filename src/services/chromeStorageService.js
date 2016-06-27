/**
 * Created by byang1 on 6/6/16.
 */
angular.module('poster')
    .service('chromeStorage', function () {
        var self = this;

        var getStorage = function(){
            return chrome.storage.local;
        };
        self.set = (key, value) => {
            return new Promise(resolve => {
                var info = {};
                info[key] = value;
                getStorage().set(info, data => {
                    console.debug('storage save', key, value, data);
                    resolve(data);
                });
            });
        };

        self.add = (key, value) => {
            return self.get(key).then(values => {
                if (!values) values = [];
                console.log(values, value);
                if (values.indexOf(value) != -1) return values;
                values.push(value);
                return self.set(key, values);
            });
        };

        self.get = key => {
            return new Promise(function (resolve) {
                getStorage().get(key, function (data) {
                    console.debug('storage load', key, data);
                    resolve(data[key]);
                });
            });
        };

        self.clear = () => {
            console.debug('clean storage');
            return new Promise(resolve => {
                getStorage().clear(function () {
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
                    getStorage().remove(key, function (data) {
                        resolve(data);
                    });
            });
        };
    });