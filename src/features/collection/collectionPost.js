var _ = require('lodash'),
	refUtils = require('../../util/ref'),
	optionsToRequestOptions = require('../internal/optionsToRequestOptions');

function collectionPost(options, operation) {
    var postOptions = _.merge({
            url: refUtils.getRelative(options.ref) + '/' + options.collection + '/' + operation,
            data: {CollectionItems: options.data}
        }, 
        optionsToRequestOptions(options, this.defaults));
    return this.request.post(postOptions);
}

module.exports = collectionPost;