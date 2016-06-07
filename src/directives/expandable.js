module.exports = function () {
    angular.module('poster')
        .directive('expandable', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {

                    var header, body, iconHolder, icon, prefix;
                    prefix = attrs.expandable;
                    header = element.find('.' + prefix + '-heading');
                    iconHolder = element.find('.' + prefix + '-title');
                    body = element.find('.' + prefix + '-body');

                    icon = angular.element('<i class="pull-right glyphicon">').appendTo(iconHolder);

                    if (attrs.expanded === undefined) {
                        body.toggle();
                        icon.addClass('glyphicon-plus');
                    } else {
                        icon.addClass('glyphicon-minus');
                    }

                    header.on('click', function () {
                        body.toggle();
                        icon.toggleClass('glyphicon-plus');
                        icon.toggleClass('glyphicon-minus');
                    });
                    element.on('$destroy', function () {
                        header.off('click');
                    });
                }
            };
        });
};
