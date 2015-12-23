var _ = require('lodash'),
    format = require('util').format,
    optionsToRequestOptions = require('./internal/optionsToRequestOptions');


/**
 Create a new object
 @param {object} options - The create options (required)
 - @member {string} type - The type to be created, e.g. defect, hierarchicalrequirement, etc. (required)
 - @member {object} data - Key/value pairs of data with which to populate the new object (required)
 - @member {object} scope - the default scoping to use.  if not specified server default will be used.
 - @member {ref} scope.workspace - the workspace
 - @member {string/string[]} fetch - the fields to include on the returned record
 - @member {object} requestOptions - Additional options to be applied to the request
 @return {promise}
 */
function create(options) {
    var postBody = {};
    postBody[options.type] = options.data;
    var requestConfig = _.merge({
        url: format('/%s/create', options.type),
        data: postBody
    }, optionsToRequestOptions(options, this.defaults));
    return this.request.post(requestConfig);
}

module.exports = create;