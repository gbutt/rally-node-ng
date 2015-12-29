require('angular');
var rallyNg = require('../..'),
	ngRequest = require('ngRequest'),
    _ = require('lodash');
require('angular-mocks');

var createResult = {
    CreateResult: {
        Errors:[], 
        Warnings:[],
        Object: {
            ObjectID: 123,
            Name: 'QQQ'
        }
    }
};

describe('#create', function(){
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

    it('should call the create endpoint', function(done){
        var data = {
            foo: 'bar'
        };
        var params = { 
            fetch: ['ObjectID','Name'].join(',') 
        };
    	rallyClient.create('defect', data, params)
    	.then(function(result){
    		expect(result).toEqual(createResult.CreateResult);
    	})
    	.finally(done);

    	$httpBackend.expectPOST(wsapiUrl + '/defect/create?fetch=ObjectID,Name', { defect: {foo: 'bar'} })
        .respond(createResult);

        $httpBackend.flush();
    })


});