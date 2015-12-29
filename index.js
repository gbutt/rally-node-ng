(function(){ 'use strict';


/**
 @module RestApi

 This module presents a higher-level API for interacting with resources
 in the Rally REST API.
 */
 
var RestApi = require('./src/RestApi'),
	NgRequest = require('./src/NgRequest'),
	rallyUtils = require('./src/util');

function rallyClientFactory($http, $q, rallyNgConfig) {
	var request = new NgRequest($http, $q, rallyNgConfig);
	return new RestApi(request, $q, rallyNgConfig);
}
rallyClientFactory.$inject = ['$http', '$q', 'rallyNgConfig'];

module.exports = angular.module('rally-ng', ['rally-ng.config'])
	.factory('rallyClient', rallyClientFactory)
	.service('rallyQueryBuilder', function(){ return rallyUtils.query; })
	.service('rallyRefUtil', function(){ return rallyUtils.ref; });

})();