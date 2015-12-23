var _ = require('lodash'),
    refUtils = require('../../util/ref');

function optionsToRequestOptions(options, defaults) {
    var params = {};
    if (defaults && defaults.workspace) {
        params.workspace = refUtils.getRelative(defaults.workspace);
    }

    if (options.scope) {
        if (options.scope.project) {
            params.project = refUtils.getRelative(options.scope.project);
            if (options.scope.hasOwnProperty('up')) {
                params.projectScopeUp = options.scope.up;
            }
            if (options.scope.hasOwnProperty('down')) {
                params.projectScopeDown = options.scope.down;
            }
        } else if (options.scope.workspace) {
            params.workspace = refUtils.getRelative(options.scope.workspace);
        }
    }

    if (_.isArray(options.fetch)) {
        params.fetch = options.fetch.join(',');
    } else if (_.isString(options.fetch)) {
        params.fetch = options.fetch;
    }

     if (_.isArray(options.order)) {
        params.order = options.order.join(',');
    } else if (_.isString(options.order)) {
        params.order = options.order;
    }
    
    if (options.query) {
        params.query = (options.query.toQueryString && options.query.toQueryString()) || options.query;
    }
    if (options.start){
        params.start = options.start;
    }
    if (options.pagesize){
        params.pagesize = options.pagesize;
    }

    return _.merge(options.requestOptions || {}, {
        params: params
    });
}

module.exports = optionsToRequestOptions;