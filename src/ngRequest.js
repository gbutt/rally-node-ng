var format = require('util').format,
    _ = require('lodash'),
    pkgInfo = require('../package.json');

var defaultServer = 'https://rally1.rallydev.com',
    defaultApiVersion = 'v2.0';

function NgRequest($http, $q, options){
    options = setDefaultOptions(options);
    options = setAuthOptions(options);	
	$http.defaults = options.http.defaults;
    this.wsapiUrl = format('%s/slm/webservice/%s', options.server, options.apiVersion);
    this.schemaUrl = format('%s/slm/schema/%s', options.server, options.apiVersion);
    this._hasKey = options.apiKey !== undefined;
    this.http = $http;
    this.Q = $q;
}

function setDefaultOptions(options) {
    return _.merge({
        server: defaultServer,
        apiVersion: defaultApiVersion,
        http: {
            defaults: {
                headers: {
                    common: {
                        'X-RallyIntegrationLibrary': format('%s v%s', pkgInfo.description, pkgInfo.version),
                        'X-RallyIntegrationName': pkgInfo.description,
                        'X-RallyIntegrationVendor': 'Rally Software, Inc.',
                        'X-RallyIntegrationVersion': pkgInfo.version,
                        'Content-Type': 'application/json',
                        'Accept-Encoding': 'gzip',
                    },
                },
            },
        },
    }, options);
}

function setAuthOptions(options) {
    options.apiKey = options.apiKey || process.env.RALLY_API_KEY;
    if(options.apiKey) {
        var authOptions = {
            http: {
                defaults: {
                    headers: {
                        common: {
                            zsessionid: options.apiKey,
                        },
                    },
                },
            },
        };
    } else {
        var auth = new Buffer(format('%s:%s', options.username, options.password)).toString('base64');
        var authOptions = {
            http: {
                defaults: {
                    withCredentials: true,
                    headers: {
                        common: {
                            Authorization: 'Basic ' + auth,
                        },
                    },
                },
            },
        };
    }
    return _.merge(authOptions, options);
}

NgRequest.prototype.doSecuredRequest = function(method, options) {
    var self = this;
	if(this._hasKey) {
        return this.doRequest(method, options);
    }

    return this.doRequest('get', {url: '/security/authorize', cache: true})
        .then(function(result) {
            if (method === 'get' || method === 'delete') {
                var requestConfig = _.merge(options, {params: {key: result.SecurityToken}});
            } else {
                var requestConfig = _.merge(options, {data: {key: result.SecurityToken}});
            }
        	return self.doRequest(method, requestConfig);
        });
};

NgRequest.prototype.doRequest = function(method, options) {
	var self = this;
	var	requestUrl = (options.url.substring(0,4) === 'http') ? options.url : this.wsapiUrl+options.url;
    var requestConfig = _.merge(options, {method: method, url: requestUrl});
	return this.http(requestConfig)
        .then(function(response){
    		var err;
    		var result = _.values(response.data)[0];
    		if (!result || !_.isObject(result)) {
                err = format('%s: %s! body=%s', options.url, response.status, result);
            } else {
                if (result.Errors && result.Errors.length) {
                    err = result.Errors;
                } else {
                    return self.Q.resolve(result);
                }
            }
            return self.Q.reject(err);
    	}).catch(function(err){
            if (!_.isArray(err)){
                if (err.status && err.status !== 200) {
                    err = format('%s: %s! body=%s', options.url, err.status, err.data);
                }
                err = [err];
            }
    		return self.Q.reject(err);
    	});
};

NgRequest.prototype.get = function(options) {
    return this.doSecuredRequest('get', options);
};

NgRequest.prototype.post = function(options) {
    return this.doSecuredRequest('post', options);
};

NgRequest.prototype.put = function(options) {
    return this.doSecuredRequest('put', options);
};

NgRequest.prototype.del = function(options) {
    return this.doSecuredRequest('delete', options);
};

module.exports = NgRequest;