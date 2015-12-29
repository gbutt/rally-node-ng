require('angular');
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
            expect(rallyClient.request.http.defaults.withCredentials).not.toBeDefined();
            var headers = rallyClient.request.http.defaults.headers.common;
            expect(headers.Authorization).not.toBeDefined();
            expect(headers.zsessionid).toEqual('abc');
        });

    });

    describe('#with basic authorization', function() {

        beforeEach(function(){
            angular.module('rally-ng.config',[])
                .value('rallyNgConfig', {
                    basicAuthorization: 'howard:the-duck',
                });
        });
        
        var rallyClient;
        beforeEach(angular.mock.inject(function(_rallyClient_) {
            rallyClient = _rallyClient_;
        }));

        it('should build proper request object', function() {
            expect(rallyClient.request._hasKey).toEqual(false);
            expect(rallyClient.request.http.defaults.withCredentials).toBeDefined();
            var headers = rallyClient.request.http.defaults.headers.common;
            expect(headers.Authorization).toEqual('Basic howard:the-duck');
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
                });
        });
        
        var rallyClient;
        beforeEach(angular.mock.inject(function(_rallyClient_) {
            rallyClient = _rallyClient_;
        }));

        it('should build proper request object', function() {
            expect(rallyClient.request.wsapiUrl).toEqual('http://rally/slm/webservice/v123');
        });

    });
});
