var rallyNg = require('../..'),
	ngRequest = require('ngRequest'),
    _ = require('lodash');
require('angular-mocks');

var deleteResult = {
    OperationResult: {
        Errors:[], 
        Warnings:[]
    }
};

describe('#delete', function(){
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

    it('should call the delete endpoint', function(done){

    	var options = {
    		ref: '/defect/1234',
            scope: {workspace: '/workspace/1234'},
    		requestOptions: { params: { fizz: 'buzz' }}
    	}
    	rallyClient.delete(options)
    	.then(function(result){
    		expect(result).toEqual(deleteResult.OperationResult);
    	})
    	.finally(done);

    	$httpBackend.expectDELETE(wsapiUrl + '/defect/1234?fizz=buzz&workspace=%2Fworkspace%2F1234')
        .respond(deleteResult);

        $httpBackend.flush();
    })


});