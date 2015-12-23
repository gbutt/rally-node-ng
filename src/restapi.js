/**
 @module RestApi

 This module presents a higher-level API for interacting with resources
 in the Rally REST API.
 */


var _ = require('lodash');

/**
 The Rally REST API client
 @constructor
 @param {object} options (optional) - optional config for the REST client
 - @member {string} server - server for the Rally API (default: https://rally1.rallydev.com)
 - @member {string} apiVersion - the Rally REST API version to use for requests (default: v2.0)
 - @member {string} userName||user - the username to use for requests (default: RALLY_USERNAME env variable) (@deprecated in favor of apiKey)
 - @member {string} password||pass - the password to use for requests (default: RALLY_PASSWORD env variable) (@deprecated in favor of apiKey)
 - @member {string} apiKey - the api key to use for requests (default: RALLY_API_KEY env variable)
 - @member {object} requestOptions - default options for the request: https://github.com/mikeal/request
 */
function RestApi(request, Q, config) {
    this.defaults = {workspace: config.workspace};
    this.request = request;
    this.Q = Q;
}

function addFeatures(proto) {
	proto.create = require('./features/create');
	proto.update = require('./features/update');
	proto.del = require('./features/delete');
	proto['delete'] = require('./features/delete');
	proto.get = require('./features/get');
	proto.query = require('./features/query');
	proto.schema = require('./features/schema');
	proto.collectionAdd = require('./features/collection/add');
	proto.collectionRemove = require('./features/collection/remove');
}

addFeatures(RestApi.prototype);
module.exports = RestApi;
