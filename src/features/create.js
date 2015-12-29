(function(){ 'use strict'; 

var format = require('../internal/formatString');


/**
 Create a new object
 @param {string} type - The type to be created, 
    e.g. defect, hierarchicalrequirement, etc. (required)
 @param {object} data - Key/value pairs of data with which 
    to populate the new object (required)
 @param {object} params - The query string parameters
 @param {object} options - The http options
 @return {promise}
 */
var create = function(type, data, params, options) {
    var postBody = {};
    postBody[type] = data;
    var requestConfig = angular.merge(
        { 
            url: format('/{0}/create', type), 
            data: postBody,
            params: params
        }, 
        options
    );
    return this.httpPost(requestConfig);
};

module.exports = create;

})();