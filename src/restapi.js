(function(){ 'use strict'; 

/**
 The Rally REST API client
 @param {NgRequest} request - the request to use as a backend for http calls
 @param {angular.$q} Q - the angular $q service
 @param {object} config - the ngRallyConfig constant
 @constructor
 */
function RestApi(request, Q, config) {
    this.defaults = {workspace: config.workspace};
    this.request = request;
    this.Q = Q;

    this.httpGet = function(options){return this.request.get(options);};
    this.httpPost = function(options){return this.request.post(options);};
    this.httpPut = function(options){return this.request.put(options);};
    this.httpDelete = function(options){return this.request.del(options);};
}

function addFeatures(proto) {
	proto.create = require('./features/create');
	proto.update = require('./features/update');
	proto.del = require('./features/delete');
	proto['delete'] = require('./features/delete');
	proto.get = require('./features/get');
	proto.query = require('./features/get');
	proto.queryAll = require('./features/queryAll');
	proto.schema = require('./features/schema');
	proto.collectionAdd = require('./features/collection/add');
	proto.collectionRemove = require('./features/collection/remove');
}

RestApi.prototype.isReady = function() {
	var common = this.request.http.defaults.headers.common;
	return common.zsessionid || common.Authorization;
};

addFeatures(RestApi.prototype);
module.exports = RestApi;

})();