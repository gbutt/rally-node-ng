(function(){ 'use strict';


var format = require('./internal/formatString'),
    isObject = require('./internal/isObject');

var defaultServer = 'https://rally1.rallydev.com',
    defaultApiVersion = 'v2.0';

/**
 An angularized http backend with support for Rally REST API
 @param {angular.$http} $http - the angular $http service
 @param {angular.$q} $q - the angular $q service
 @param {object} options - the ngRallyConfig constant
 @constructor
 */
function NgRequest($http, $q, options){

    function setDefaultOptions(options) {
        return angular.merge({
            server: defaultServer,
            apiVersion: defaultApiVersion,

        }, options);
    }

    function setAuthOptions(options, $http) {
        if(options.apiKey) {
            $http.defaults.headers.common.zsessionid = options.apiKey;
        } else if (options.basicAuthorization) {
            $http.defaults.headers.common.Authorization = 
                'Basic ' + options.basicAuthorization;
            $http.defaults.withCredentials = true;
        }
    }
    
    options = setDefaultOptions(options);
    setAuthOptions(options, $http);
    this.wsapiUrl = format('{0}/slm/webservice/{1}', options.server, options.apiVersion);
    this.schemaUrl = format('{0}/slm/schema/{1}', options.server, options.apiVersion);
    this._hasKey = options.apiKey !== undefined;
    this.http = $http;
    this.Q = $q;
}

function valueOfFirstProperty(object) {
    var prop;
    for (prop in object) {
        if (object.hasOwnProperty(prop)) { 
            break; 
        }
    }
    return object[prop];
}

NgRequest.prototype.doSecuredRequest = function(method, options) {
    var self = this;
	if(this._hasKey) {
        return this.doRequest(method, options);
    }

    return this.doRequest('get', {url: '/security/authorize', cache: true})
        .then(function(result) {
            var requestConfig;
            if (method === 'get' || method === 'delete') {
                requestConfig = angular.merge({},
                    options, 
                    {
                        params: {
                            key: result.SecurityToken
                        }
                    }
                );
            } else {
                requestConfig = angular.merge({},
                    options, 
                    {
                        data: {
                            key: result.SecurityToken
                        }
                    }
                );
            }
        	return self.doRequest(method, requestConfig);
        });
};

NgRequest.prototype.doRequest = function(method, options) {
	var self = this;
	var	requestUrl = (options.url.substring(0,4) === 'http') ? 
        options.url : this.wsapiUrl+options.url;
        
    var requestConfig = angular.merge({},
        options, 
        {
            method: method, 
            url: requestUrl
        }
    );
	return this.http(requestConfig)
        .then(function(response){
    		var err;
    		var result = valueOfFirstProperty(response.data);
    		if (!result || !isObject(result)) {
                err = format('{0}: {1}! body={2}', 
                    requestConfig.url, response.status, result
                );
            } else {
                if (result.Errors && result.Errors.length) {
                    err = result.Errors;
                } else {
                    return self.Q.resolve(result);
                }
            }
            return self.Q.reject(err);
    	}).catch(function(err){
            if (!Array.isArray(err)){
                if (err.status && err.status !== 200) {
                    err = format('{0}: {1}! body={2}', 
                        requestConfig.url, err.status, err.data
                    );
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

})();