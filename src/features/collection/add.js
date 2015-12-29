(function(){ 'use strict'; 

var refUtils = require('../../util/ref');
	
/**
 Adds items to a collection
 @param {string} ref - The ref of the collection to update, 
 	e.g. /user/12345/TeamMemberships (required)
 @param {object} data - [{_ref: objectRef}, {Name:"Joe"}], 
 	things to be added to the collection (required)
 @param {object} params - The query string parameters
 @param {object} options - The http options
 @return {promise}
 */
var add = function(ref, data, params, options) {
	var postOptions = angular.merge({
            url: refUtils.getRelative(ref)+'/add',
            data: {CollectionItems: data},
            params: params
        }, 
        options);
    return this.request.post(postOptions);
};

module.exports = add;

})();