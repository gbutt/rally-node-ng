require('angular');
var rallyNg = require('../..'),
    ngRequest = require('ngRequest'),
    _ = require('lodash');
require('angular-mocks');

var schemaResult = {
  "QueryResult" : {
    "Errors" : [ ],
    "Warnings" : [ ],
    "TotalResultCount" : 48,
    "StartIndex" : 1,
    "PageSize" : 200,
    "Results" : [
        {
            "Name": "Artifact Notification",
            "ObjectID": 44401157532,
        },
        {
            "Name" : "Changeset",
            "ObjectID" : 44401157658,
        },
        {
            "Name": "Change",
            "ObjectID": 44401157663,
        }
    ]
    }
};

describe('#schema', function() {

    beforeEach(function(){
        angular.mock.module('rally-ng');
    });

    beforeEach(function(){
        angular.module('rally-ng.config',[]).value('rallyNgConfig', {
            apiKey: 'abc',
        });
    });

    var rallyClient, $q, $httpBackend, schemaUrl, wsapiUrl;
    beforeEach(angular.mock.inject(function(_rallyClient_, _$q_, _$httpBackend_) {
        rallyClient = _rallyClient_;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
        schemaUrl = rallyClient.request.schemaUrl;
        wsapiUrl = rallyClient.request.wsapiUrl;
    }));

    it('creates a valid schema request', function(done) {        
        rallyClient.schema({
            ObjectID: '12345',
            SchemaVersion: 'abcde'
        })
        .then(function(result) {
            expect(result.Errors).toEqual([]);
            expect(result.Warnings).toEqual([]);
            expect(result.Results).toEqual(schemaResult.QueryResult.Results);
        })
        .catch(function(error){
            fail('Error not expected');
        })
        .finally(done);


        $httpBackend.expectGET(schemaUrl + '/workspace/12345/abcde')
        .respond(schemaResult);

        $httpBackend.flush();
    });

    // it('caches the request', function(done) {
    //     var workspace = {
    //         ObjectID: '12345',
    //         SchemaVersion: 'abcde'
    //     };
    //     rallyClient.schema(workspace)
    //     .then(function(firstResult) {
    //         return rallyClient.schema(workspace).then(function(secondResult){
    //             expect(secondResult).toEqual(firstResult);
    //         });
    //     })
    //     .catch(function(error){
    //         fail('Error not expected');
    //     })
    //     .finally(done);


    //     $httpBackend.expectGET(schemaUrl + '/workspace/12345/abcde')
    //     .respond(schemaResult);
    //     $httpBackend.expectGET(schemaUrl + '/workspace/12345/abcde')
    //     .respond('I am malformed!');

    //     $httpBackend.flush();
    // });

    it('fetches the workspace if none provided', function(done) {
        var workspace = workspace = {
            ObjectID: '12345',
            SchemaVersion: 'abcde'
        };
        var workspaceQueryResult = {
            QueryResult: {
                Errors:[], 
                Warnings:[],
                PageSize: 1,
                StartIndex: 1,
                TotalResultCount: 1,
                Results:[workspace]
            }
        };

        rallyClient.schema()
        .then(function(result) {
            expect(result).toEqual(schemaResult.QueryResult);
        })
        .catch(function(error){
            fail('Error not expected');
        })
        .finally(done);


        $httpBackend.expectGET(wsapiUrl + '/workspace?fetch=ObjectID,SchemaVersion')
        .respond(workspaceQueryResult);
        $httpBackend.expectGET(schemaUrl + '/workspace/12345/abcde')
        .respond(schemaResult);

        $httpBackend.flush();
    });

});