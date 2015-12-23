require('angular');
var restApi = require('./src/restapi'),
	NgRequest = require('./src/ngRequest'),
	rallyUtils = require('./src/util');

var module = angular.module('rally-ng', ['rally-ng.config'])
	.factory('rallyClient', rallyClientFactory)
	.service('rallyQueryBuilder', function(){return rallyUtils.query})
	.service('rallyRefUtil', function(){return rallyUtils.ref});

rallyClientFactory.$inject = ['$http', '$q', 'rallyNgConfig'];
function rallyClientFactory($http, $q, rallyNgConfig) {
	var request = new NgRequest($http, $q, rallyNgConfig);
	return new restApi(request, $q, rallyNgConfig);
}

module.exports = module;
