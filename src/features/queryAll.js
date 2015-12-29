(function(){ 'use strict'; 

var refUtils = require('../util/ref');

/**
 Query for all objects
 @param {string} ref - The ref of the collection to query, e.g. /defect (required)
 @param {object} params - The query string parameters
 @param {object} options - The http options
 @return {promise}
 */
var queryAll = function(ref, params, options) {
    var self = this;

    var paramsClone = angular.merge({}, params);

    // normalize limit
    var limit = paramsClone.limit;
    if (limit) {
        paramsClone.limit = undefined;
        if (limit < 1) {
            limit = undefined;
        }
    }

    // normalize pagesize
    paramsClone.pagesize = paramsClone.pagesize || 100;
    if (limit && (limit < paramsClone.pagesize)) {
        paramsClone.pagesize = limit;
    }

    // normalize start
    paramsClone.start = paramsClone.start || 1;

    var requestConfig = angular.merge(
        {
            url: refUtils.getRelative(ref),
            params: paramsClone,
        },
        options
    );

    var deferred = this.Q.defer();
    var results = [];

    function loadRemainingPages(result) {
        var pageResults = result.Results;
        deferred.notify(pageResults);
        // adjust limit to total results count
        limit = limit || result.TotalResultCount;
        results = results.concat(pageResults);

        // get next page
        if (limit > results.length) {
            var nextPageConfig = angular.merge(
                {},
                requestConfig, 
                {
                    params: {
                        start: results.length+1,
                        pagesize: Math.min(limit - results.length, paramsClone.pagesize)
                    }
                }
            );
            return self.httpGet(nextPageConfig)
            .then(loadRemainingPages);
        }

        // final result
        result.Results = results;
        result.StartIndex = paramsClone.start;
        result.PageSize = results.length;
        return result;

    }

    this.httpGet(requestConfig)
    .then(loadRemainingPages)
    .then(deferred.resolve)
    .catch(deferred.reject);

    return deferred.promise;
};

module.exports = queryAll;

})();