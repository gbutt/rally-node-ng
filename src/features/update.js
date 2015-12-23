var _ = require('lodash'),
	refUtils = require('../util/ref'),
    optionsToRequestOptions = require('./internal/optionsToRequestOptions');

/**
 Update an object
 @param {object} options - The update options (required)
 - @member {string} ref - The ref of the object to update, e.g. /defect/12345 (required)
 - @member {object} data - Key/value pairs of data with which to update object (required)
 - @member {object} scope - the default scoping to use.  if not specified server default will be used.
 - @member {ref} scope.workspace - the workspace
 - @member {string/string[]} fetch - the fields to include on the returned record
 - @member {object} requestOptions - Additional options to be applied to the request
 @return {promise}
 */
function update(options, callback) {
    var postBody = {};
    postBody[refUtils.getType(options.ref)] = options.data;
    return this.request.put(_.merge({
        url: refUtils.getRelative(options.ref),
        data: postBody
    }, optionsToRequestOptions(options, this.defaults)));
}

module.exports = update;