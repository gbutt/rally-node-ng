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

    	var options = {
    		ref: '/defect/123',
    		data: {foo: 'bar'},
    		scope: {workspace: '/workspace/1234'},
    		fetch: ['ObjectID','Name'],
    		requestOptions: { data: { fizz: 'buzz' }}
    	}
    	rallyClient.update(options)
    	.then(function(result){
    		expect(result).toEqual(updateResult.OperationResult);
    	})
    	.finally(done);

    	$httpBackend.expectPUT(wsapiUrl + '/defect/123?fetch=ObjectID,Name&workspace=%2Fworkspace%2F1234', { defect: {foo: 'bar'}, fizz: 'buzz'})
        .respond(updateResult);

        $httpBackend.flush();
    })


});