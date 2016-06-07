/**
 * Created by byang1 on 6/7/16.
 */

angular.module('poster')
    .service('urlService', function ($window) {
        var self = this;
        var parser = $window.document.createElement('a');

        self.parseUrl = url => {
            parser.href = url;
            return _.pick(parser, ['protocol', 'hostname', 'port', 'pathname', 'search', 'hash']);
        };
    });