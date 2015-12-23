var _ = require('lodash'),
	refUtils = require('../util/ref'),
    optionsToRequestOptions = require('./internal/optionsToRequestOptions');

/**
 Get an object
 @param {object} options - The get options (required)
 - @member {string} ref - The ref of the object to get, e.g. /defect/12345 (required)
 - @member {object} scope - the default scoping to use.  if not specified server default will be used.
 - @member {ref} scope.workspace - the workspace
 - @member {string/string[]} fetch - the fields to include on the returned record
 - @member {object} requestOptions - Additional options to be applied to the request
 @return {promise}
 */
function get(options, callback) {
    return this.request.get(_.merge({
            url: refUtils.getRelative(options.ref)
        },
        optionsToRequestOptions(options, this.defaults)));
    // .then(function(result) {
    //     return {
    //             Errors: result.Errors,
    //             Warnings: result.Warnings,
    //             Object: _.omit(result, ['Errors', 'Warnings'])
    //         };
    // });
}

module.exports = get;