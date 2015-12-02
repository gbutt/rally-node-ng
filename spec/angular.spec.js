var rallyNg = require('..'),
	ngRequest = require('ngRequest'),
    _ = require('lodash');
require('angular-mocks');

describe('#rallyNg', function(){
    beforeEach(function(){
        angular.mock.module('rally-ng');
    });

    describe('#with api key', function() {

        beforeEach(function(){
            angular.module('rally-ng.config',[])
                .value('rallyNgConfig', {
                    apiKey: 'abc',
                });
        });
        
        var rallyClient;
        beforeEach(angular.mock.inject(function(_rallyClient_) {
            rallyClient = _rallyClient_;
        }));

        it('should build proper request object', function() {
            expect(rallyClient.request._hasKey).toEqual(true);
            expect(rallyClient.request.httpRequest.defaults.withCredentials).not.toBeDefined();
            var headers = rallyClient.request.httpRequest.defaults.headers.common;
            expect(headers.Authorization).not.toBeDefined();
            expect(headers.zsessionid).toEqual('abc');
        });

    });

    describe('#with user/pass', function() {

        beforeEach(function(){
            angular.module('rally-ng.config',[])
                .value('rallyNgConfig', {
                    username: 'howard',
                    password: 'the-duck',
                });
        });
        
        var rallyClient;
        beforeEach(angular.mock.inject(function(_rallyClient_) {
            rallyClient = _rallyClient_;
        }));

        it('should build proper request object', function() {
            expect(rallyClient.request._hasKey).toEqual(false);
            expect(rallyClient.request.httpRequest.defaults.withCredentials).toBeDefined();
            var headers = rallyClient.request.httpRequest.defaults.headers.common;
            expect(headers.Authorization).toBeDefined();
            expect(headers.zsessionid).not.toBeDefined();
        });

    });

    describe('#with default options', function() {

        beforeEach(function(){
            angular.module('rally-ng.config',[])
                .value('rallyNgConfig', {
                    apiKey: 'abc',
                });
        });
        
        var rallyClient;
        beforeEach(angular.mock.inject(function(_rallyClient_) {
            rallyClient = _rallyClient_;
        }));

        it('should build proper request object', function() {
            var headers = rallyClient.request.httpRequest.defaults.headers.common;
            expect(headers['Content-Type']).toEqual('application/json');
            expect(headers['Accept-Encoding']).toEqual('gzip');
            expect(rallyClient.request.wsapiUrl).toEqual('https://rally1.rallydev.com/slm/webservice/v2.0');
        });

    });

    describe('#with other options', function() {

        beforeEach(function(){
            angular.module('rally-ng.config',[])
                .value('rallyNgConfig', {
                    apiKey: 'abc',
                    server: 'http://rally',
                    apiVersion: 'v123',
                    gzip: false,
                    json: false,
                    headers: {foo: 'bar', fizz: 'buzz'},
                });
        });
        
        var rallyClient;
        beforeEach(angular.mock.inject(function(_rallyClient_) {
            rallyClient = _rallyClient_;
        }));

        it('should build proper request object', function() {
            var headers = rallyClient.request.httpRequest.defaults.headers.common;
            expect(headers['Content-Type']).not.toBeDefined();
            expect(headers['Accept-Encoding']).not.toBeDefined();
            expect(headers.foo).toEqual('bar');
            expect(headers.fizz).toEqual('buzz');
            expect(rallyClient.request.wsapiUrl).toEqual('http://rally/slm/webservice/v123');
        });

    });
});
