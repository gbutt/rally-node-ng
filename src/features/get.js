(function(){ 'use strict'; 

var refUtils = require('../util/ref');

/**
 Get an object
 @param {string} ref - The ref of the object to get, e.g. /defect/12345 (required)
 @param {object} params - The query string parameters
 @param {object} options - The http options
 @return {promise}
 */
var get = function(ref, params, options) {
	var requestConfig = angular.merge(
		{ 
			url: refUtils.getRelative(ref),
			params: params
		},
        options
    );
    return this.request.get(requestConfig);
};

module.exports = get;

})();