var _ = require('lodash'),
	refUtils = require('../util/ref'),
    optionsToRequestOptions = require('./internal/optionsToRequestOptions');

/**
 Delete an object
 @param {object} options - The delete options (required)
 - @member {string} ref - The ref of the object to delete, e.g. /defect/1234
 - @member {object} scope - the default scoping to use.  if not specified server default will be used.
 - @member {ref} scope.workspace - the workspace
 - @member {object} requestOptions - Additional options to be applied to the request
 @return {promise}
 */
function del(options) {
    return this.request.del(_.merge({
        url: refUtils.getRelative(options.ref)
    }, optionsToRequestOptions(options, this.defaults)));
}

module.exports = del;