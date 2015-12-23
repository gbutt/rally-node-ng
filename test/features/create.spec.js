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

    	var options = {
    		type: 'defect',
    		data: {foo: 'bar'},
    		scope: {workspace: '/workspace/1234'},
    		fetch: ['ObjectID','Name'],
    		requestOptions: { data: { fizz: 'buzz' }}
    	}
    	rallyClient.create(options)
    	.then(function(result){
    		expect(result).toEqual(createResult.CreateResult);
    	})
    	.finally(done);

    	$httpBackend.expectPOST(wsapiUrl + '/defect/create?fetch=ObjectID,Name&workspace=%2Fworkspace%2F1234', { defect: {foo: 'bar'}, fizz: 'buzz'})
        .respond(createResult);

        $httpBackend.flush();
    })


});