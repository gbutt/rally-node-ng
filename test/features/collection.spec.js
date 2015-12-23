var rallyNg = require('../..'),
	ngRequest = require('ngRequest'),
    _ = require('lodash');
require('angular-mocks');

var addResult = {
    OperationResult: {
        Errors:[], 
        Warnings:[],
        Object: {
            ObjectID: 123,
            Name: 'QQQ'
        }
    }
};

var removeResult = {
    "OperationResult": {
        "Errors": [],
        "Warnings": [],
        "_rallyAPIMajor": "2",
        "_rallyAPIMinor": "0"
    }
};

describe('#collections', function(){
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

    it('should call the add collection endpoint', function(done){

    	var options = {
    		ref: '/defect/123',
            collection: 'tasks',
    		data: [{Name: 'bar'}],
    		scope: {workspace: '/workspace/1234'},
    		fetch: ['ObjectID','Name']
    	}
    	rallyClient.collectionAdd(options)
    	.then(function(result){
    		expect(result).toEqual(addResult.OperationResult);
    	})
    	.finally(done);

    	$httpBackend.expectPOST(wsapiUrl + '/defect/123/tasks/add?fetch=ObjectID,Name&workspace=%2Fworkspace%2F1234', { CollectionItems: [{Name: 'bar'}] })
        .respond(addResult);

        $httpBackend.flush();
    });

    it('should call the remove collection endpoint', function(done){

        var options = {
            ref: '/defect/123',
            collection: 'tasks',
            data: [{_ref: '/task/123'}],
            scope: {workspace: '/workspace/1234'},
            fetch: ['ObjectID','Name']
        }
        rallyClient.collectionRemove(options)
        .then(function(result){
            expect(result).toEqual(removeResult.OperationResult);
        })
        .finally(done);

        $httpBackend.expectPOST(wsapiUrl + '/defect/123/tasks/remove?fetch=ObjectID,Name&workspace=%2Fworkspace%2F1234', { CollectionItems: [{_ref: '/task/123'}] })
        .respond(removeResult);

        $httpBackend.flush();
    });

});