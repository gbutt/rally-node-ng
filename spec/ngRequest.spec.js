var ngRequest = require('ngRequest'),
    _ = require('lodash');

describe('NgRequest', function() {

    var ngRequestBuilder;
    var $q, $httpBackend, $timeout;
    beforeEach(inject(function(_$q_, _$httpBackend_, _$http_, _$timeout_) {
        $q = _$q_;
        $httpBackend = _$httpBackend_;
        $timeout = _$timeout_;

        ngRequestBuilder = {init: _.curry(ngRequest.init)(_$http_, $q)};
    }));

    // afterEach(function() {
    //     $httpBackend.verifyNoOutstandingExpectation();
    //     $httpBackend.verifyNoOutstandingRequest();
    // });

    function createRequest(options) {
        return ngRequestBuilder.init(_.extend({
            server: 'https://rally1.rallydev.com',
            apiVersion: 'v2.0'
        }, options));
    }

    function createRequestWithApiKey(options) {
        return ngRequestBuilder.init(_.extend({
            server: 'https://rally1.rallydev.com',
            apiVersion: 'v2.0',
            requestOptions: {headers: { zsessionid: 'secret'}}
        }, options));
    }

    describe('#constructor', function() {

        it('should initialize the wsapi url correctly', function() {
            var request = createRequest({
                server: 'http://www.acme.com',
                apiVersion: 'v3.0'
            });

            expect(request.wsapiUrl).toEqual('http://www.acme.com/slm/webservice/v3.0');
        });

        it('should initialize the httpRequest', function() {
            var request = createRequest();
            expect(request.httpRequest).toBeDefined();
        });

        it('should initialize the Q', function() {
            var request = createRequest();
            expect(request.Q).toBeDefined();
        });

        it('should pass headers through', function() {
            var request = createRequest({requestOptions: {
                headers: {foo: 'bar', fizz: 'buzz'}
            }});
            expect(request.httpRequest.defaults.headers.common.foo).toEqual('bar');
            expect(request.httpRequest.defaults.headers.common.fizz).toEqual('buzz');
        });

        it('should construct Auth header', function() {
            var auth = new Buffer('username:password').toString('base64');
            var request = createRequest({ requestOptions: {
                auth: {user: 'username', pass: 'password'} 
            }});
            expect(request.httpRequest.defaults.headers.common.Authorization).toEqual('Basic ' + auth);
            expect(request._hasKey).toEqual(false);
        });

        it('should not construct Auth header is api key provided', function() {
            var auth = new Buffer('username:password').toString('base64');
            var request = createRequest({ requestOptions: {
                headers: {zsessionid: 'secret'}
            }});
            expect(request.httpRequest.defaults.headers.common.Authorization).not.toBeDefined();
            expect(request._hasKey).toEqual(true);
        });

        it('should have json content type header', function() {
            var request = createRequest({ requestOptions: {
                json: true
            }});
            expect(request.httpRequest.defaults.headers.common['Content-Type']).toEqual('application/json');
        });

        it('should have gzip accept encoding header', function() {
            var request = createRequest({ requestOptions: {
                gzip: true
            }});
            expect(request.httpRequest.defaults.headers.common['Accept-Encoding']).toEqual('gzip');
        });

        it('should have withCredentials when cookie jar required', function() {
            var request = createRequest({ requestOptions: {
                jar: true
            }});
            expect(request.httpRequest.defaults.withCredentials).toEqual(true);
        });
    });

    describe('#httpMethods', function() {

        it('should do secured get requests with params, qs and url querystring', function(done) {
            var rr = createRequest();
            var data = { Errors: [], Warnings: [], QueryResult: { Results: [] }};
            rr.get({params: {foo:'bar'}, qs: { beep: 'boop'}, url: '/someUrl?fizz=buzz'})
            .then(function(result){
                expect(result).toEqual(data);
            })
            .catch(function(err){
                fail();
            })
            .finally(done);

            $httpBackend.expectGET(rr.wsapiUrl + '/security/authorize')
            .respond({Result: {Errors:[], SecurityToken: 'abc'}});
            $httpBackend.expectGET(rr.wsapiUrl + '/someUrl?fizz=buzz&beep=boop&foo=bar&key=abc')
            .respond({Result: data});
            $httpBackend.flush();

        });

        it('should do secure post requests with json and data', function(done) {
            var rr = createRequest();
            var data = { Errors: [], Warnings: [], QueryResult: { Results: [] }};
            rr.post({json: {foo:'bar'}, data: {fizz: 'buzz'}, url: '/someUrl'})
            .then(function(result){
                expect(result).toEqual(data);
            })
            .catch(function(err){
                fail();
            })
            .finally(done);

            $httpBackend.expectGET(rr.wsapiUrl + '/security/authorize')
            .respond({Result: {Errors:[], SecurityToken: 'abc'}});
            $httpBackend.expectPOST(rr.wsapiUrl + '/someUrl', {foo:'bar', fizz: 'buzz', key: 'abc'})
            .respond({Result: data});
            $httpBackend.flush();

        });

        it('should do secure put requests with json and data', function(done) {
            var rr = createRequest();
            var data = { Errors: [], Warnings: [], QueryResult: { Results: [] }};
            rr.put({json: {foo:'bar'}, data: {fizz: 'buzz'}, url: '/someUrl'})
            .then(function(result){
                expect(result).toEqual(data);
            })
            .catch(function(err){
                fail();
            })
            .finally(done);

            $httpBackend.expectGET(rr.wsapiUrl + '/security/authorize')
            .respond({Result: {Errors:[], SecurityToken: 'abc'}});
            $httpBackend.expectPUT(rr.wsapiUrl + '/someUrl', {foo:'bar', fizz: 'buzz', key: 'abc'})
            .respond({Result: data});
            $httpBackend.flush();

        });

        it('should do secured del requests', function(done) {
            var rr = createRequest();
            var data = { Errors: [], Warnings: [], QueryResult: { Results: [] }};
            rr.del({ url: '/someUrl'})
            .then(function(result){
                expect(result).toEqual(data);
            })
            .catch(function(err){
                fail();
            })
            .finally(done);

            $httpBackend.expectGET(rr.wsapiUrl + '/security/authorize')
            .respond({Result: {Errors:[], SecurityToken: 'abc'}});
            $httpBackend.expectDELETE(rr.wsapiUrl + '/someUrl?key=abc')
            .respond({Result: data});
            $httpBackend.flush();

        });
    });

    describe('#doRequest', function() {
        it('should default to wsapi base url', function(done){
            var rr = createRequest();
            var data = { Errors: [], Warnings: [], QueryResult: { Results: [] }};
            rr.doRequest('get',{url: '/defect'})
            .finally(done);

            $httpBackend.expectGET(rr.wsapiUrl+'/defect')
            .respond({Result: data});
            $httpBackend.flush();
        });

        it('should allow base URL override', function(done){
            var rr = createRequest();
            var data = { Errors: [], Warnings: [], QueryResult: { Results: [] }};
            rr.doRequest('get',{url: 'http://rally/schema'})
            .finally(done);

            $httpBackend.expectGET('http://rally/schema')
            .respond({Result: data});
            $httpBackend.flush();
        });

        it('rejects the promise with an http error', function(done){
            var rr = createRequest();
            rr.doRequest('get',{url: '/defect'})
            .then(function(){
                fail();
            })
            .catch(function(err){
                expect(err).toEqual([rr.wsapiUrl+'/defect: 400! body=undefined']);
            })
            .finally(done);

            $httpBackend.expectGET(rr.wsapiUrl+'/defect')
            .respond(400);
            $httpBackend.flush();
        });

        it('rejects the promise with an empty response', function(done) {
            var rr = createRequest();
            rr.doRequest('get',{url: '/defect'})
            .then(function(){
                fail();
            })
            .catch(function(err){
                expect(err).toEqual([rr.wsapiUrl+'/defect: 200! body=undefined']);
            })
            .finally(done);

            $httpBackend.expectGET(rr.wsapiUrl+'/defect')
            .respond(200, '');
            $httpBackend.flush();
        });

        it('rejects the promise with a non json response', function(done) {
            var rr = createRequest();
            rr.doRequest('get',{url: '/defect'})
            .then(function(){
                fail();
            })
            .catch(function(err){
                expect(err).toEqual([rr.wsapiUrl+'/defect: 404! body=not found!']);
            })
            .finally(done);

            $httpBackend.expectGET(rr.wsapiUrl+'/defect')
            .respond(404, 'not found!');
            $httpBackend.flush();
        });

        it('rejects the promise with an error on a successful response', function(done) {
            var rr = createRequest();
            var data = {Errors:['Error!']};
            rr.doRequest('get',{url: '/defect'})
            .then(function(){
                fail();
            })
            .catch(function(err){
                expect(err).toEqual(['Error!']);
            })
            .finally(done);

            $httpBackend.expectGET(rr.wsapiUrl+'/defect')
            .respond(200, {Result: data});
            $httpBackend.flush();
        });

        it('resolves the promise with a success', function(done) {
            var rr = createRequest();
            var data = {Errors:[], foo: 'bar'};
            rr.doRequest('get',{url: '/defect'})
            .then(function(result){
                expect(result).toEqual(data);
            })
            .catch(function(err){
                fail();
            })
            .finally(done);

            $httpBackend.expectGET(rr.wsapiUrl+'/defect')
            .respond(200, {Result: data});
            $httpBackend.flush();
        });

        it('appends querystring for get operation', function(done) {
            var rr = createRequest();
            var data = {Errors:[], foo: 'bar'};
            rr.doRequest('get',{url: '/defect', qs: {foo: 'bar'}, params: {fizz: 'buzz'}})
            .then(function(result){
                expect(result).toEqual(data);
            })
            .catch(function(err){
                fail();
            })
            .finally(done);

            $httpBackend.expectGET(rr.wsapiUrl+'/defect?fizz=buzz&foo=bar')
            .respond(200, {Result: data});
            $httpBackend.flush();
        });

        it('appends querystring for delete operation', function(done) {
            var rr = createRequest();
            var data = {Errors:[], foo: 'bar'};
            rr.doRequest('delete',{url: '/defect', qs: {foo: 'bar'}, params: {fizz: 'buzz'}})
            .then(function(result){
                expect(result).toEqual(data);
            })
            .catch(function(err){
                fail();
            })
            .finally(done);

            $httpBackend.expectDELETE(rr.wsapiUrl+'/defect?fizz=buzz&foo=bar')
            .respond(200, {Result: data});
            $httpBackend.flush();
        });

        it('appends data', function(done) {
            var rr = createRequest();
            var data = {Errors:[], foo: 'bar'};
            rr.doRequest('post',{url: '/defect', json: {foo: 'bar'}, data: {fizz: 'buzz'}})
            .then(function(result){
                expect(result).toEqual(data);
            })
            .catch(function(err){
                fail();
            })
            .finally(done);

            $httpBackend.expectPOST(rr.wsapiUrl+'/defect', {foo: 'bar', fizz: 'buzz'})
            .respond(200, {Result: data});
            $httpBackend.flush();
        });
    });

    describe('#doSecuredRequest', function() {

        it('does not request a security token if api key specified', function(done) {
            var rr = createRequestWithApiKey();
            var data = { Errors: [], Warnings: [], Results: [] };
            rr.doSecuredRequest('post',{ url: '/someUrl'})
            .then(function(result){
                expect(result).toEqual(data);
            })
            .catch(function(err){
                fail();
            })
            .finally(done);

            $httpBackend.expectPOST(rr.wsapiUrl + '/someUrl')
            .respond({OperationResult: data});
            $httpBackend.flush();
        });

        it('requests a security token for post operation', function(done) {
            var rr = createRequest();
            var data = { Errors: [], Warnings: [], Results: [] };
            rr.doSecuredRequest('post', { url: '/someUrl'})
            .then(function(result){
                expect(result).toEqual(data);
            })
            .catch(function(err){
                fail();
            })
            .finally(done);

            $httpBackend.expectGET(rr.wsapiUrl + '/security/authorize')
            .respond({Result: {Errors:[], SecurityToken: 'abc'}});
            $httpBackend.expectPOST(rr.wsapiUrl + '/someUrl', {key: 'abc'})
            .respond({OperationResult: data});
            $httpBackend.flush();
        });

        it('requests a security token for get operation', function(done) {
            var rr = createRequest();
            var data = { Errors: [], Warnings: [], Results: [] };
            rr.doSecuredRequest('get', { url: '/someUrl'})
            .then(function(result){
                expect(result).toEqual(data);
            })
            .catch(function(err){
                fail();
            })
            .finally(done);

            $httpBackend.expectGET(rr.wsapiUrl + '/security/authorize')
            .respond({Result: {Errors:[], SecurityToken: 'abc'}});
            $httpBackend.expectGET(rr.wsapiUrl + '/someUrl?key=abc')
            .respond({OperationResult: data});
            $httpBackend.flush();
        });

        it('requests a security token for delete operation', function(done) {
            var rr = createRequest();
            var data = { Errors: [], Warnings: [], Results: [] };
            rr.doSecuredRequest('delete', { url: '/someUrl'})
            .then(function(result){
                expect(result).toEqual(data);
            })
            .catch(function(err){
                fail();
            })
            .finally(done);

            $httpBackend.expectGET(rr.wsapiUrl + '/security/authorize')
            .respond({Result: {Errors:[], SecurityToken: 'abc'}});
            $httpBackend.expectDELETE(rr.wsapiUrl + '/someUrl?key=abc')
            .respond({OperationResult: data});
            $httpBackend.flush();
        });

        it('rejects the promise on security token failure', function(done) {
            var rr = createRequest();
            rr.doSecuredRequest('post', { url: '/someUrl'})
            .then(function(result){
                fail();
            })
            .catch(function(err){
                expect(err).toEqual(['error']);
            })
            .finally(done);

            $httpBackend.expectGET(rr.wsapiUrl + '/security/authorize')
            .respond({Result: {Errors:['error']}});
            $httpBackend.flush();
        });

        it('rejects the promise on request failure', function(done) {
            var rr = createRequest();
            rr.doSecuredRequest('post', { url: '/someUrl'})
            .then(function(result){
                fail();
            })
            .catch(function(err){
                expect(err).toEqual(['error']);
            })
            .finally(done);

            $httpBackend.expectGET(rr.wsapiUrl + '/security/authorize')
            .respond({Result: {Errors:[], SecurityToken: 'abc'}});
            $httpBackend.expectPOST(rr.wsapiUrl + '/someUrl', {key: 'abc'})
            .respond({OperationResult: { Errors: ['error'] }});
            $httpBackend.flush();
        });
    });

});