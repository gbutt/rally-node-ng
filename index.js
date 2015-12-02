require('angular');
var restApi = require('rally'),
	ngRequest = require('./src/ngRequest'),
	_ = require('lodash');

var module = angular.module('rally-ng', ['rally-ng.config'])
	.factory('rallyClient', rallyClientFactory);

rallyClientFactory.$inject = ['$http', '$q', 'rallyNgConfig'];
function rallyClientFactory($http, $q, rallyNgConfig) {
	var ngRequestBuilder = {init: _.curry(ngRequest.init)($http, $q)};
	var options = configToOptions(rallyNgConfig);
	return new restApi(options, ngRequestBuilder);
}

function configToOptions(config) {
	return {
		apiKey: config.apiKey,
		user: config.username,
		password: config.password,
		server: config.server,
		apiVersion: config.apiVersion,
		requestOptions: {
			gzip: config.gzip,
			json: config.json,
			headers: config.headers,
		},
	};
}

module.exports = module;
