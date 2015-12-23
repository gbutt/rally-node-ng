var rallyNg = require('../..'),
	ngRequest = require('ngRequest'),
    _ = require('lodash');
require('angular-mocks');

var getResult = {
    Defect: {
        Description: "",
        Errors: [],
        Name: "QQQ",
        ObjectID: 48861896406,
        Warnings: [],
        _objectVersion: "1",
        _rallyAPIMajor: "2",
        _rallyAPIMinor: "0",
        _ref: "https://rally1.rallydev.com/slm/webservice/v2.0/defect/48861896406",
        _refObjectName: "QQQ",
        _refObjectUUID: "76969c6b-87c3-462e-82e3-5c225ad796aa"
    }
}

describe('#get', function(){
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

    it('should call the get endpoint', function(done){

    	var options = {
            ref: '/defect/48861896406',
            scope: {workspace: '/workspace/1234'},
            fetch: ['Description','Name','ObjectID'],
            requestOptions: {
                params: {foo: 'bar'}
            }
        };
    	rallyClient.get(options)
    	.then(function(result){
    		expect(result).toEqual(getResult.Defect);
    	})
    	.finally(done);

    	$httpBackend.expectGET(wsapiUrl + '/defect/48861896406?fetch=Description,Name,ObjectID&foo=bar&workspace=%2Fworkspace%2F1234')
        .respond(getResult);

        $httpBackend.flush();
    });

    it('should allow simple get', function(done){

        var options = {
            ref: '/defect/48861896406',
            scope: {workspace: '/workspace/1234'}
        };
        rallyClient.get(options)
        .then(function(result){
            expect(result).toEqual(getResult.Defect);
        })
        .finally(done);

        $httpBackend.expectGET(wsapiUrl + '/defect/48861896406?workspace=%2Fworkspace%2F1234')
        .respond(getResult);

        $httpBackend.flush();
    });


});