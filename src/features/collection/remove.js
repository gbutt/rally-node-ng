(function(){ 'use strict'; 

var refUtils = require('../../util/ref');

/**
 Remove items from a collection
 @param {string} ref - The ref of the collection to update, 
 	e.g. /user/12345/TeamMemberships (required)
 @param {object} data - [{_ref: objectRef}], where the objectRefs 
 	are to be removed from the collection (required)
 @param {object} params - The query string parameters
 @param {object} options - The http options
 @return {promise}
 */
var remove = function(ref, data, params, options) {
    var postOptions = angular.merge({
            url: refUtils.getRelative(ref)+'/remove',
            data: {CollectionItems: data},
            params: params
        }, 
        options);
    return this.request.post(postOptions);
};

module.exports = remove;

})();