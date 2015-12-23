var _ = require('lodash'),
    refUtils = require('../util/ref'),
    format = require('util').format,
    optionsToRequestOptions = require('./internal/optionsToRequestOptions');

/**
 Query for objects
 @param {object} options - The query options (required)
 - @member {string} ref - The ref of the collection to query, e.g. /defect/12345/tasks (required if type not specified)
 - @member {string} type - The type to query, e.g. defect, hierarchicalrequirement (required if ref not specified)
 - @member {object} scope - the default scoping to use.  if not specified server default will be used.
 - @member {ref} scope.workspace - the workspace
 - @member {ref} scope.project - the project, or null to include entire workspace
 - @member {ref} scope.up - true to include parent project data, false otherwise
 - @member {ref} scope.down - true to include child project data, false otherwise
 - @member {int} start - the 1 based start index
 - @member {int} pagesize - the page size, 1 - 200 (default=200)
 - @member {int} limit - the maximum number of records to return, -1 for all
 - @member {string/string[]} fetch - the fields to include on each returned record
 - @member {string/string[]} order - the order by which to sort the results
 - @member {string/query} query - a query to filter the result set
 - @member {object} requestOptions - Additional options to be applied to the request
 @return {promise}
 */
function query(options) {
    var self = this;
    options = _.merge({
        start: 1,
        pagesize: 200
    }, options);

    var requestOptions = _.merge({
        url: refUtils.getRelative(options.ref) || format('/%s', options.type)
    }, optionsToRequestOptions(options, this.defaults));

    var deferred = this.Q.defer();
    var results = [];

    function loadRemainingPages(result) {
        var pageResults = result.Results;
        deferred.notify(pageResults);
        results = results.concat(pageResults);
        if (!options.limit) {
            options.limit = options.pagesize;
        }
        if (options.limit == -1 || options.limit > result.TotalResultCount) {
            options.limit = result.TotalResultCount;
        }
        if (options.limit > results.length) {
            return self.request.get(_.merge(requestOptions, {
                params: {
                    start: results.length+1,
                    pagesize: Math.min(options.limit - results.length, options.pagesize)
                }
            })).then(loadRemainingPages);
        } else {
            result.Results = results;
            result.StartIndex = options.start;
            result.PageSize = results.length;
            return result;
        }
    }

    this.request.get(requestOptions)
        .then(loadRemainingPages)
        .then(deferred.resolve)
        .catch(deferred.reject);

    return deferred.promise;
}

module.exports = query;