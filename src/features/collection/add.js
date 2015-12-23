var collectionPost = require('./collectionPost');
	
/**
 Adds items to a collection
 @param {object} options - The add options (required)
 - @member {string} ref - The ref of the collection to update, e.g. /user/12345 (required)
 - @member {string} collection - The name of the collection to update, e.g. 'TeamMemberships (required)
 - @member {object} data - [{_ref: objectRef}, {Name:"Joe"}], things to be added to the collection (required)
 - @member {string/string[]} fetch - the fields to include on the returned records
 - @member {object} scope - the default scoping to use.  if not specified server default will be used.
 - @member {ref} scope.workspace - the workspace
 - @member {object} requestOptions - Additional options to be applied to the request
 @return {promise}
 */
function add(options) {
    return collectionPost.call(this, options, 'add');
}

module.exports = add;