(function(){ 'use strict'; 

var refUtils = require('../util/ref');

/**
 Update an object
 @param {string} ref - The ref of the object to update, e.g. /defect/12345 (required)
 @param {object} data - Key/value pairs of data with which to update object (required)
 @param {object} params - The query string parameters
 @param {object} options - The http options
 @return {promise}
 */
var update = function(ref, data, params, options) {
    var postBody = {};
    postBody[refUtils.getType(ref)] = data;
    var requestConfig = angular.merge(
    	{
        	url: refUtils.getRelative(ref),
        	data: postBody,
            params: params
    	}, 
    	options
	);
    return this.httpPut(requestConfig);
};

module.exports = update;

})();