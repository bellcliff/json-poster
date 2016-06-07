/**
 * Created by byang1 on 6/7/16.
 */
module.exports = {
    views: {
        '': {
            template: require('html!./template.html')
        },
        'history@poster': {
            template: require('html!./history/template.html'),
            controller: require('./history/controller'),
            controllerAs: 'history'
        },
        'post@poster': {
            template: require('html!./post/template.html'),
            controller: require('./post/controller')
        }
    }
};