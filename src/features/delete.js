(function(){ 'use strict'; 

var refUtils = require('../util/ref');

/**
 Delete an object
 @param ref - The ref of the object to delete, e.g. /defect/1234 (required)
 @param {object} params - The query string parameters
 @param {object} options - The http options 
 @return {promise}
 */
var del = function (ref, params, options) {
	var requestConfig = angular.merge(
		{
        	url: refUtils.getRelative(ref),
            params: params
    	},
    	options
	);
    return this.httpDelete(requestConfig);
};

module.exports = del;

})();