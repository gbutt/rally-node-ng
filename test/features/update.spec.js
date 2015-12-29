require('angular');
var rallyNg = require('../..'),
    ngRequest = require('ngRequest'),
    _ = require('lodash');
require('angular-mocks');

var updateResult = {
    OperationResult: {
        Errors:[], 
        Warnings:[],
        Object: {
            ObjectID: 123,
            Name: 'QQQ'
        }
    }
};

describe('#update', function(){
    beforeEach(function(){
        angular.mock.module('rally-ng');
    });

    beforeEach(function(){
        angular.module('rally-ng.config',[]).value('rallyNgConfig', {
            apiKey: 'abc',
        });
    });

    var rallyClient, $q, $httpBackend, wsapiUrl;
    beforeEach(angular.mock.inject(function(_rallyClient_, _$q_, _$httpBackend_) {
        rallyClient = _rallyClient_;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
        wsapiUrl = rallyClient.request.wsapiUrl;
    }));

    it('should call the update endpoint', function(done){
        var data = {
            foo: 'bar'
        }; 
        var params = { 
            fetch: ['ObjectID','Name'].join(',') 
        };
    	rallyClient.update('/defect/123', data, params)
    	.then(function(result){
    		expect(result).toEqual(updateResult.OperationResult);
    	})
    	.finally(done);

    	$httpBackend.expectPUT(wsapiUrl + '/defect/123?fetch=ObjectID,Name', { defect: {foo: 'bar'} })
        .respond(updateResult);

        $httpBackend.flush();
    })


});