var rallyNg = require('../..'),
	ngRequest = require('ngRequest'),
    _ = require('lodash');
require('angular-mocks');

var queryResult = {
    QueryResult: {
        Errors:[], 
        Warnings:[],
        PageSize: 20,
        StartIndex: 1,
        TotalResultCount: 1,
        Results: [
            {FormattedID: 123}
        ]
    }
};

describe('#query', function(){
    beforeEach(function(){
        angular.mock.module('rally-ng');
    });

    beforeEach(function(){
        angular.module('rally-ng.config',[]).value('rallyNgConfig', {
            apiKey: 'abc',
        });
    });

    var rallyClient, $q, $httpBackend, wsapiUrl, rallyQueryBuilder;
    beforeEach(angular.mock.inject(function(_rallyClient_, _$q_, _$httpBackend_, _rallyQueryBuilder_) {
        rallyClient = _rallyClient_;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
        wsapiUrl = rallyClient.request.wsapiUrl;
        rallyQueryBuilder = _rallyQueryBuilder_;
    }));

    it('should call the query endpoint', function(done){
        var ref = '/defect';
        var params = {
        	workspace: '/workspace/1234',
        	fetch: 'FormattedID',
        	foo: 'bar'
        };
        rallyClient.queryAll(ref, params)
        .then(function(result){
            expect(result.Results).toEqual(queryResult.QueryResult.Results);
            expect(result.StartIndex).toEqual(1);
            expect(result.PageSize).toEqual(1);
        })
        .finally(done);

        $httpBackend.expectGET(wsapiUrl + '/defect?fetch=FormattedID&foo=bar&pagesize=100&start=1&workspace=%2Fworkspace%2F1234')
        .respond(queryResult);

        $httpBackend.flush();
    });

    it('should fetch multiple pages with limit', function(done){

        var queryResultPage1 = {
            QueryResult: {
                Errors:[], 
                Warnings:[],
                PageSize: 2,
                StartIndex: 1,
                TotalResultCount: 4,
                Results: [
                    {FormattedID: 123},
                    {FormattedID: 234}
                ]
            }
        };
        var queryResultPage2 = {
            QueryResult: {
                Errors:[], 
                Warnings:[],
                PageSize: 2,
                StartIndex: 3,
                TotalResultCount: 4,
                Results: [
                    {FormattedID: 345}
                ]
            }
        };

        var ref = '/defect';
        var params = {
        	workspace: '/workspace/1234',
        	limit:3,
            pagesize:2,
            fetch: 'FormattedID'
        };
        rallyClient.queryAll(ref, params)
        .then(function(result){
            var expectedResults = queryResultPage1.QueryResult.Results.concat(queryResultPage2.QueryResult.Results)

            expect(result.Results).toEqual(expectedResults);
            expect(result.TotalResultCount).toEqual(4);
            expect(result.Results.length).toEqual(3);
            expect(result.StartIndex).toEqual(1);
            expect(result.PageSize).toEqual(3);
        })
        .finally(done);

        $httpBackend.expectGET(wsapiUrl + '/defect?fetch=FormattedID&pagesize=2&start=1&workspace=%2Fworkspace%2F1234')
        .respond(queryResultPage1);
        $httpBackend.expectGET(wsapiUrl + '/defect?fetch=FormattedID&pagesize=1&start=3&workspace=%2Fworkspace%2F1234')
        .respond(queryResultPage2);

        $httpBackend.flush();
    });

    it('should fetch all pages without limit', function(done){

        var queryResultPage1 = {
            QueryResult: {
                Errors:[], 
                Warnings:[],
                PageSize: 2,
                StartIndex: 1,
                TotalResultCount: 4,
                Results: [
                    {FormattedID: 123},
                    {FormattedID: 234}
                ]
            }
        };
        var queryResultPage2 = {
            QueryResult: {
                Errors:[], 
                Warnings:[],
                PageSize: 2,
                StartIndex: 3,
                TotalResultCount: 4,
                Results: [
                    {FormattedID: 345},
                    {FormattedID: 456}
                ]
            }
        };

        var ref = '/defect';
        var params = {
        	workspace: '/workspace/1234',
            pagesize:2,
            fetch: 'FormattedID'
        };
        rallyClient.queryAll(ref, params)
        .then(function(result){
            var expectedResults = queryResultPage1.QueryResult.Results.concat(queryResultPage2.QueryResult.Results)

            expect(result.Results).toEqual(expectedResults);
            expect(result.TotalResultCount).toEqual(4);
            expect(result.Results.length).toEqual(4);
            expect(result.StartIndex).toEqual(1);
            expect(result.PageSize).toEqual(4);
        })
        .finally(done);

        $httpBackend.expectGET(wsapiUrl + '/defect?fetch=FormattedID&pagesize=2&start=1&workspace=%2Fworkspace%2F1234')
        .respond(queryResultPage1);
        $httpBackend.expectGET(wsapiUrl + '/defect?fetch=FormattedID&pagesize=2&start=3&workspace=%2Fworkspace%2F1234')
        .respond(queryResultPage2);

        $httpBackend.flush();
    });

    it('should fetch single page with limit', function(done){

        var queryResultPage1 = {
            QueryResult: {
                Errors:[], 
                Warnings:[],
                PageSize: 2,
                StartIndex: 1,
                TotalResultCount: 4,
                Results: [
                    {FormattedID: 123},
                    {FormattedID: 234}
                ]
            }
        };

        var ref = '/defect';
        var params = {
        	workspace: '/workspace/1234',
            limit:2,
            fetch: 'FormattedID',
        };
        rallyClient.queryAll(ref, params)
        .then(function(result){
            var expectedResults = queryResultPage1.QueryResult.Results;

            expect(result.Results).toEqual(expectedResults);
            expect(result.TotalResultCount).toEqual(4);
            expect(result.Results.length).toEqual(2);
            expect(result.StartIndex).toEqual(1);
            expect(result.PageSize).toEqual(2);
        })
        .finally(done);

        $httpBackend.expectGET(wsapiUrl + '/defect?fetch=FormattedID&pagesize=2&start=1&workspace=%2Fworkspace%2F1234')
        .respond(queryResultPage1);

        $httpBackend.flush();
    });

    it('should reject on error', function(done){

        var queryResultError = {
            QueryResult: {
                Errors:['Some Error!'], 
                Warnings:[]
            }
        };

        var ref = '/defect';
        var params = {
        	workspace: '/workspace/1234',
        	fetch: 'FormattedID'
        };
        rallyClient.queryAll(ref, params)
        .then(function(result){
            fail('Should not get result');
        })
        .catch(function(result) {
            expect(result).toEqual(queryResultError.QueryResult.Errors);
        })
        .finally(done);

        $httpBackend.expectGET(wsapiUrl + '/defect?fetch=FormattedID&pagesize=100&start=1&workspace=%2Fworkspace%2F1234')
        .respond(queryResultError);

        $httpBackend.flush();
    });

});