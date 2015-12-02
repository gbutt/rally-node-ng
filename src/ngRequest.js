var format = require('util').format,
    _ = require('lodash');

function NgRequest($http, $q, options){
    options = options || {};
    options.requestOptions = options.requestOptions || {};
    options.requestOptions.headers = options.requestOptions.headers || {}
    options.requestOptions.auth = options.requestOptions.auth || {}

    function hasKey(){
        return options.requestOptions.headers.zsessionid !== undefined;
    }
	
	$http.defaults.headers.common = options.requestOptions.headers;
    if (!hasKey()) {
    	var auth = new Buffer(format('%s:%s', options.requestOptions.auth.user,options.requestOptions.auth.pass)).toString('base64');
    	$http.defaults.headers.common.Authorization = 'Basic ' + auth;
    }
    if (options.requestOptions.json) {
    	$http.defaults.headers.common['Content-Type'] = 'application/json';
    }
    if(options.requestOptions.gzip) {
    	$http.defaults.headers.common['Accept-Encoding'] = 'gzip';
    }
    if(options.requestOptions.jar) {
    	$http.defaults.withCredentials = true;
    }

    this.wsapiUrl = format('%s/slm/webservice/%s', options.server, options.apiVersion);
    this._hasKey = hasKey();
    this.httpRequest = $http;
    this.Q = $q;
}

NgRequest.prototype.doSecuredRequest = function(method, options) {
    var self = this;
	if(this._hasKey) {
        return this.doRequest(method, options);
    }

    return this.doRequest('get', {url: '/security/authorize', cache: true})
    .then(function(result) {
        if (method === 'get' || method === 'delete') {
            var requestOptions = _.merge(options, {params: {key: result.SecurityToken}});
        } else {
            var requestOptions = _.merge(options, {data: {key: result.SecurityToken}});
        }
    	return self.doRequest(method, requestOptions);
    });
};

NgRequest.prototype.doRequest = function(method, options) {
	var self = this;
	var	requestUrl = (options.url.substring(0,4) === 'http') ? options.url : this.wsapiUrl+options.url;
    var requestOptions = _.merge(options, {method: method, url: requestUrl});
    if (method === 'get' || method === 'delete') {
        requestOptions = _.merge(requestOptions, {params: options.qs});
    } else {
        requestOptions = _.merge(requestOptions, {data: options.json});
    }
	return this.httpRequest(requestOptions)
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

module.exports = {
    init: function($http, $q, options) {
        return new NgRequest($http, $q, options);
    }
};