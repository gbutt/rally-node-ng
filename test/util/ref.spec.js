var should = require('should'),
    refUtils = require('../../src/util/ref');

describe('Ref', function() {

    describe('#isRef', function() {

        it('should handle invalid refs', function() {
            expect(refUtils.isRef(6786876))
                .toEqual(false);

            expect(refUtils.isRef({}))
                .toEqual(false);

            expect(refUtils.isRef(false))
                .toEqual(false);

            expect(refUtils.isRef('yar'))
                .toEqual(false);

            expect(refUtils.isRef(null))
                .toEqual(false);

            expect(refUtils.isRef())
                .toEqual(false);

            expect(refUtils.isRef('/defect'))
                .toEqual(false);

            expect(refUtils.isRef('https://rally1.rallydev.com/slm/webservice/1.32/defect/abc.js'))
                .toEqual(false);

            expect(refUtils.isRef(''))
                .toEqual(false);
        });

        it('should handle basic refs', function() {
            expect(refUtils.isRef('https://rally1.rallydev.com/slm/webservice/1.17/builddefinition/81177657'))
                .toEqual(true);

            expect(refUtils.isRef('https://rally1.rallydev.com/slm/webservice/1.17/builddefinition/81177657.js'))
                .toEqual(true);

            expect(refUtils.isRef('/builddefinition/81177657.js'))
                .toEqual(true);

            expect(refUtils.isRef('/builddefinition/81177657'))
                .toEqual(true);

            
            expect(refUtils.isRef('https://rally1.rallydev.com/slm/webservice/v3.0/builddefinition/3493b049-3ea7-4c9a-bf78-069487936c13'))
                .toEqual(true);

            expect(refUtils.isRef('https://rally1.rallydev.com/slm/webservice/v3.0/builddefinition/3493b0493ea74c9abf78069487936c13'))
                .toEqual(true);

            expect(refUtils.isRef('/builddefinition/3493b049-3ea7-4c9a-bf78-069487936c13'))
                .toEqual(true);

            expect(refUtils.isRef('/builddefinition/3493b0493ea74c9abf78069487936c13'))
                .toEqual(true);

        });

        it('should handle permission refs', function() {
            expect(refUtils.isRef('/projectpermission/1234u5678p1'))
                .toEqual(true);

            expect(refUtils.isRef('/projectpermission/1234u5678p1.js'))
                .toEqual(true);

            expect(refUtils.isRef('https://rally1.rallydev.com/slm/webservice/v2.0/projectpermission/1234u5678p1.js'))
                .toEqual(true);

            expect(refUtils.isRef('/workspacepermission/1234u5678w1'))
                .toEqual(true);

            expect(refUtils.isRef('/workspacepermission/1234u5678w1.js'))
                .toEqual(true);

            expect(refUtils.isRef('https://rally1.rallydev.com/slm/webservice/v2.0/workspacepermission/1234u5678w1.js'))
                .toEqual(true);

            
            expect(refUtils.isRef('https://rally1.rallydev.com/slm/webservice/v3.0/workspacepermission/1637adf8-0830-4a48-9420-fb5bdb8575d6u3497d043-3ea7-4c2c-bf78-069847936c13w1'))
                .toEqual(true);

            expect(refUtils.isRef('https://rally1.rallydev.com/slm/webservice/v3.0/workspacepermission/1637adf808304a489420fb5bdb8575d6u3497d0433ea74c2cbf78069847936c13w1'))
                .toEqual(true);

            expect(refUtils.isRef('/workspacepermission/1637adf8-0830-4a48-9420-fb5bdb8575d6u3497d043-3ea7-4c2c-bf78-069847936c13w1'))
                .toEqual(true);

            expect(refUtils.isRef('/workspacepermission/1637adf808304a489420fb5bdb8575d6u3497d0433ea74c2cbf78069847936c13w1'))
                .toEqual(true);

        });

        it('should handle built-in refs', function() {
            expect(refUtils.isRef('/typedefinition/-1234.js'))
                .toEqual(true);

            expect(refUtils.isRef('/typedefinition/-1234'))
                .toEqual(true);

            expect(refUtils.isRef('https://rally1.rallydev.com/slm/webservice/v2.0/typedefinition/-1234'))
                .toEqual(true);

            expect(refUtils.isRef('/typedefinition/-1234/attributes'))
                .toEqual(true);

        });

        it('should handle objects', function() {
            expect(refUtils.isRef({_ref: '/defect/12345'}))
                .toEqual(true);

            expect(refUtils.isRef({_ref: 'https://rally1.rallydev.com/slm/webservice/v2.0/defect/12345'}))
                .toEqual(true);

            
            expect(refUtils.isRef({_ref: 'https://rally1.rallydev.com/slm/webservice/v3.0/defect/3493b049-3ea7-4c9a-bf78-069487936c13'}))
                .toEqual(true);

            expect(refUtils.isRef({_ref: 'https://rally1.rallydev.com/slm/webservice/v3.0/defect/3493b0493ea74c9abf78069487936c13'}))
                .toEqual(true);

            expect(refUtils.isRef({_ref: '/defect/3493b049-3ea7-4c9a-bf78-069487936c13'}))
                .toEqual(true);

            expect(refUtils.isRef({_ref: '/defect/3493b0493ea74c9abf78069487936c13'}))
                .toEqual(true);

        });

        it('should handle dynatype refs', function() {
            expect(refUtils.isRef('/portfolioitem/feature/1234'))
                .toEqual(true);

            expect(refUtils.isRef('/portfolioitem/feature/1234.js'))
                .toEqual(true);

            expect(refUtils.isRef('https://rally1.rallydev.com/slm/webservice/1.32/portfolioitem/feature/1234'))
                .toEqual(true);

            expect(refUtils.isRef('http://rally1.rallydev.com/slm/webservice/1.32/portfolioitem/feature/1234.js'))
                .toEqual(true);

            expect(refUtils.isRef('/portfolioitem/feature/1234/children.js'))
                .toEqual(true);

            expect(refUtils.isRef('/portfolioitem/feature/1234/children'))
                .toEqual(true);

            expect(refUtils.isRef('https://rally1.rallydev.com/slm/webservice/v2.0/portfolioitem/feature/1234/children'))
                .toEqual(true);

            
            expect(refUtils.isRef('https://rally1.rallydev.com/slm/webservice/v3.0/portfolioitem/feature/3493b049-3ea7-4c9a-bf78-069487936c13/children'))
                .toEqual(true);

            expect(refUtils.isRef('https://rally1.rallydev.com/slm/webservice/v3.0/portfolioitem/feature/3493b0493ea74c9abf78069487936c13/children'))
                .toEqual(true);

            expect(refUtils.isRef('/portfolioitem/feature/3493b049-3ea7-4c9a-bf78-069487936c13/children'))
                .toEqual(true);

            expect(refUtils.isRef('/portfolioitem/feature/3493b0493ea74c9abf78069487936c13/children'))
                .toEqual(true);

        });
    });

    describe('#getRelative', function() {

        it('should handle non-refs', function() {
            expect(refUtils.getRelative('blah'))
                .toEqual('blah');

            expect(refUtils.getRelative(''))
                .toEqual('');

            expect(refUtils.getRelative(null))
                .toBeNull();

            expect(refUtils.getRelative({}))
                .toEqual({});

            expect(refUtils.getRelative({_ref: null}))
                .toEqual({_ref: null});
        });

        it('should handle basic refs', function() {
             expect(refUtils.getRelative('/defect/1234'))
                                .toEqual('/defect/1234');

             expect(refUtils.getRelative('/defect/1234.js'))
                                .toEqual('/defect/1234');

             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/1.32/defect/1234'))
                                .toEqual('/defect/1234');

             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/1.32/defect/1234.js'))
                                .toEqual('/defect/1234');

            
             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/v3.0/defect/3493b049-3ea7-4c9a-bf78-069487936c13.js'))
                                .toEqual('/defect/3493b049-3ea7-4c9a-bf78-069487936c13');

             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/v3.0/defect/3493b0493ea74c9abf78069487936c13'))
                                .toEqual('/defect/3493b0493ea74c9abf78069487936c13');

             expect(refUtils.getRelative('/defect/3493b049-3ea7-4c9a-bf78-069487936c13.js'))
                                .toEqual('/defect/3493b049-3ea7-4c9a-bf78-069487936c13');

             expect(refUtils.getRelative('/defect/3493b0493ea74c9abf78069487936c13'))
                                .toEqual('/defect/3493b0493ea74c9abf78069487936c13');

        });

        it('should handle basic collection refs', function() {
             expect(refUtils.getRelative('/defect'))
                                .toEqual('/defect');

             expect(refUtils.getRelative('/defect.js'))
                                .toEqual('/defect');

             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/1.32/defect'))
                                .toEqual('/defect');

             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/1.32/defect.js'))
                                .toEqual('/defect');

        });

        it('should handle dynatype refs', function() {
             expect(refUtils.getRelative('/portfolioitem/feature/1234'))
                                .toEqual('/portfolioitem/feature/1234');

             expect(refUtils.getRelative('/portfolioitem/feature/1234.js'))
                                .toEqual('/portfolioitem/feature/1234');

             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/v2.0/portfolioitem/feature/1234'))
                                .toEqual('/portfolioitem/feature/1234');

             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/v2.0/portfolioitem/feature/1234.js'))
                                .toEqual('/portfolioitem/feature/1234');

            
             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/v3.0/portfolioitem/feature/3493b049-3ea7-4c9a-bf78-069487936c13'))
                                .toEqual('/portfolioitem/feature/3493b049-3ea7-4c9a-bf78-069487936c13');

             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/v3.0/portfolioitem/feature/3493b0493ea74c9abf78069487936c13'))
                                .toEqual('/portfolioitem/feature/3493b0493ea74c9abf78069487936c13');

             expect(refUtils.getRelative('/portfolioitem/feature/3493b049-3ea7-4c9a-bf78-069487936c13'))
                                .toEqual('/portfolioitem/feature/3493b049-3ea7-4c9a-bf78-069487936c13');

             expect(refUtils.getRelative('/portfolioitem/feature/3493b0493ea74c9abf78069487936c13'))
                                .toEqual('/portfolioitem/feature/3493b0493ea74c9abf78069487936c13');

        });

        it('should handle dynatype collection refs', function() {
             expect(refUtils.getRelative('/portfolioitem/feature/1234/children'))
                                .toEqual('/portfolioitem/feature/1234/children');

             expect(refUtils.getRelative('/portfolioitem/feature/1234/children.js'))
                                .toEqual('/portfolioitem/feature/1234/children');

             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/v2.0/portfolioitem/feature/1234/children'))
                                .toEqual('/portfolioitem/feature/1234/children');

             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/v2.0/portfolioitem/feature/1234/children.js'))
                                .toEqual('/portfolioitem/feature/1234/children');

            
             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/v3.0/portfolioitem/feature/3493b0493ea74c9abf78069487936c13/children'))
                                .toEqual('/portfolioitem/feature/3493b0493ea74c9abf78069487936c13/children');

             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/v3.0/portfolioitem/feature/3493b049-3ea7-4c9a-bf78-069487936c13/children'))
                                .toEqual('/portfolioitem/feature/3493b049-3ea7-4c9a-bf78-069487936c13/children');

             expect(refUtils.getRelative('/portfolioitem/feature/3493b0493ea74c9abf78069487936c13/children'))
                                .toEqual('/portfolioitem/feature/3493b0493ea74c9abf78069487936c13/children');

             expect(refUtils.getRelative('/portfolioitem/feature/3493b049-3ea7-4c9a-bf78-069487936c13/children'))
                                .toEqual('/portfolioitem/feature/3493b049-3ea7-4c9a-bf78-069487936c13/children');

        });

        it('should handle collection refs', function() {
             expect(refUtils.getRelative('/defect/1234/tasks'))
                                .toEqual('/defect/1234/tasks');

             expect(refUtils.getRelative('/defect/1234/tasks.js'))
                                .toEqual('/defect/1234/tasks');

             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/v2.0/defect/1234/tasks'))
                                .toEqual('/defect/1234/tasks');

             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/v2.0/defect/1234/tasks.js'))
                                .toEqual('/defect/1234/tasks');

            
             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/v3.0/defect/3493b049-3ea7-4c9a-bf78-069487936c13/tasks'))
                                .toEqual('/defect/3493b049-3ea7-4c9a-bf78-069487936c13/tasks');

             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/v3.0/defect/3493b0493ea74c9abf78069487936c13/tasks'))
                                .toEqual('/defect/3493b0493ea74c9abf78069487936c13/tasks');

             expect(refUtils.getRelative('/defect/3493b049-3ea7-4c9a-bf78-069487936c13/tasks'))
                                .toEqual('/defect/3493b049-3ea7-4c9a-bf78-069487936c13/tasks');

             expect(refUtils.getRelative('/defect/3493b0493ea74c9abf78069487936c13/tasks'))
                                .toEqual('/defect/3493b0493ea74c9abf78069487936c13/tasks');

        });

        it('should handle built-in refs', function() {
             expect(refUtils.getRelative('/typedefinition/-1234'))
                                .toEqual('/typedefinition/-1234');

             expect(refUtils.getRelative('/typedefinition/-1234.js'))
                                .toEqual('/typedefinition/-1234');

             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/v2.0/typedefinition/-1234.js'))
                                .toEqual('/typedefinition/-1234');

             expect(refUtils.getRelative('/typedefinition/-1234/attributes'))
                                .toEqual('/typedefinition/-1234/attributes');

             expect(refUtils.getRelative('/typedefinition/-1234/attributes.js'))
                                .toEqual('/typedefinition/-1234/attributes');

             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/v2.0/typedefinition/-1234/attributes.js'))
                                .toEqual('/typedefinition/-1234/attributes');

        });

        it('should support various wsapi versions', function() {
             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/v2.0/defect/1234/tasks'))
                                .toEqual('/defect/1234/tasks');

             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/1.43/defect/1234/tasks'))
                                .toEqual('/defect/1234/tasks');

             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/x/defect/1234/tasks'))
                                .toEqual('/defect/1234/tasks');

            
             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/v2.0/defect/3493b049-3ea7-4c9a-bf78-069487936c13/tasks'))
                                .toEqual('/defect/3493b049-3ea7-4c9a-bf78-069487936c13/tasks');

             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/v2.0/defect/3493b0493ea74c9abf78069487936c13/tasks'))
                                .toEqual('/defect/3493b0493ea74c9abf78069487936c13/tasks');

             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/v3.0/defect/3493b049-3ea7-4c9a-bf78-069487936c13/tasks'))
                                .toEqual('/defect/3493b049-3ea7-4c9a-bf78-069487936c13/tasks');

             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/v3.0/defect/3493b0493ea74c9abf78069487936c13/tasks'))
                                .toEqual('/defect/3493b0493ea74c9abf78069487936c13/tasks');

        });

        it('should handle permissions refs', function() {
             expect(refUtils.getRelative('/projectpermission/1234u5678p1'))
                                .toEqual('/projectpermission/1234u5678p1');

             expect(refUtils.getRelative('/projectpermission/1234u5678p1.js'))
                                .toEqual('/projectpermission/1234u5678p1');

             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/v2.0/projectpermission/1234u5678p1.js'))
                                .toEqual('/projectpermission/1234u5678p1');

             expect(refUtils.getRelative('/workspacepermission/1234u5678w1'))
                                .toEqual('/workspacepermission/1234u5678w1');

             expect(refUtils.getRelative('/workspacepermission/1234u5678w1.js'))
                                .toEqual('/workspacepermission/1234u5678w1');

             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/v2.0/workspacepermission/1234u5678w1.js'))
                                .toEqual('/workspacepermission/1234u5678w1');

            
             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/v3.0/workspacepermission/1637adf8-0830-4a48-9420-fb5bdb8575d6u3497d043-3ea7-4c2c-bf78-069847936c13w1'))
                                .toEqual('/workspacepermission/1637adf8-0830-4a48-9420-fb5bdb8575d6u3497d043-3ea7-4c2c-bf78-069847936c13w1');

             expect(refUtils.getRelative('https://rally1.rallydev.com/slm/webservice/v3.0/workspacepermission/1637adf808304a489420fb5bdb8575d6u3497d0433ea74c2cbf78069847936c13w1'))
                                .toEqual('/workspacepermission/1637adf808304a489420fb5bdb8575d6u3497d0433ea74c2cbf78069847936c13w1');

             expect(refUtils.getRelative('/workspacepermission/1637adf8-0830-4a48-9420-fb5bdb8575d6u3497d043-3ea7-4c2c-bf78-069847936c13w1'))
                                .toEqual('/workspacepermission/1637adf8-0830-4a48-9420-fb5bdb8575d6u3497d043-3ea7-4c2c-bf78-069847936c13w1');

             expect(refUtils.getRelative('/workspacepermission/1637adf808304a489420fb5bdb8575d6u3497d0433ea74c2cbf78069847936c13w1'))
                                .toEqual('/workspacepermission/1637adf808304a489420fb5bdb8575d6u3497d0433ea74c2cbf78069847936c13w1');

        });
    });

    describe('#getType', function() {

        it('should handle non-refs', function() {
            expect(refUtils.getType('blah'))
                .toBeNull();

            expect(refUtils.getType(''))
                .toBeNull();

            expect(refUtils.getType(null))
                .toBeNull();

            expect(refUtils.getType({}))
                .toBeNull();

            expect(refUtils.getType({_ref: null}))
                .toBeNull();
        });

        it('should handle basic refs', function() {
             expect(refUtils.getType('/defect/1234'))
                            .toEqual('defect');

             expect(refUtils.getType('https://rally1.rallydev.com/slm/webservice/v2.0/defect/1234.js'))
                            .toEqual('defect');


             expect(refUtils.getType('https://rally1.rallydev.com/slm/webservice/v3.0/defect/3493b0493ea74c9abf78069487936c13'))
                            .toEqual('defect');

             expect(refUtils.getType('https://rally1.rallydev.com/slm/webservice/v3.0/defect/3493b049-3ea7-4c9a-bf78-069487936c13'))
                            .toEqual('defect');

             expect(refUtils.getType('/defect/3493b0493ea74c9abf78069487936c13'))
                            .toEqual('defect');

             expect(refUtils.getType('/defect/3493b049-3ea7-4c9a-bf78-069487936c13'))
                            .toEqual('defect');

        });

        it('should handle basic collection refs', function() {
             expect(refUtils.getType('/defect'))
                                .toEqual('defect');

             expect(refUtils.getType('/defect.js'))
                                .toEqual('defect');

             expect(refUtils.getType('https://rally1.rallydev.com/slm/webservice/1.32/defect'))
                                .toEqual('defect');

             expect(refUtils.getType('https://rally1.rallydev.com/slm/webservice/1.32/defect.js'))
                                .toEqual('defect');

        });

        it('should handle dynatype refs', function() {
             expect(refUtils.getType('/portfolioitem/feature/1234'))
                            .toEqual('portfolioitem/feature');

             expect(refUtils.getType('https://rally1.rallydev.com/slm/webservice/v2.0/portfolioitem/feature/1234.js'))
                            .toEqual('portfolioitem/feature');

            
             expect(refUtils.getType('https://rally1.rallydev.com/slm/webservice/v3.0/portfolioitem/feature/3493b049-3ea7-4c9a-bf78-069487936c13'))
                            .toEqual('portfolioitem/feature');

             expect(refUtils.getType('https://rally1.rallydev.com/slm/webservice/v3.0/portfolioitem/feature/3493b0493ea74c9abf78069487936c13'))
                            .toEqual('portfolioitem/feature');

             expect(refUtils.getType('/portfolioitem/feature/3493b049-3ea7-4c9a-bf78-069487936c13'))
                            .toEqual('portfolioitem/feature');

             expect(refUtils.getType('/portfolioitem/feature/3493b0493ea74c9abf78069487936c13'))
                            .toEqual('portfolioitem/feature');

        });

        it('should handle dynatype collection refs', function() {
             expect(refUtils.getType('/portfolioitem/feature/1234/children'))
                            .toEqual('portfolioitem/feature');

             expect(refUtils.getType('https://rally1.rallydev.com/slm/webservice/v2.0/portfolioitem/feature/1234/children.js'))
                            .toEqual('portfolioitem/feature');

            
             expect(refUtils.getType('https://rally1.rallydev.com/slm/webservice/v3.0/portfolioitem/feature/3493b049-3ea7-4c9a-bf78-069487936c13/children'))
                            .toEqual('portfolioitem/feature');

             expect(refUtils.getType('https://rally1.rallydev.com/slm/webservice/v3.0/portfolioitem/feature/3493b0493ea74c9abf78069487936c13/children'))
                            .toEqual('portfolioitem/feature');

             expect(refUtils.getType('/portfolioitem/feature/3493b049-3ea7-4c9a-bf78-069487936c13/children'))
                            .toEqual('portfolioitem/feature');

             expect(refUtils.getType('/portfolioitem/feature/3493b0493ea74c9abf78069487936c13/children'))
                            .toEqual('portfolioitem/feature');

        });

        it('should handle collection refs', function() {
             expect(refUtils.getType('/defect/1234/tasks'))
                            .toEqual('defect');

             expect(refUtils.getType('https://rally1.rallydev.com/slm/webservice/v2.0/defect/1234/tasks.js'))
                            .toEqual('defect');

            
             expect(refUtils.getType('https://rally1.rallydev.com/slm/webservice/v3.0/defect/3493b0493ea74c9abf78069487936c13/tasks'))
                            .toEqual('defect');

             expect(refUtils.getType('https://rally1.rallydev.com/slm/webservice/v3.0/defect/3493b049-3ea7-4c9a-bf78-069487936c13/tasks'))
                            .toEqual('defect');

             expect(refUtils.getType('/defect/3493b0493ea74c9abf78069487936c13/tasks'))
                            .toEqual('defect');

             expect(refUtils.getType('/defect/3493b049-3ea7-4c9a-bf78-069487936c13/tasks'))
                            .toEqual('defect');

        });

        it('should handle built-in refs', function() {
             expect(refUtils.getType('/typedefinition/-1234'))
                            .toEqual('typedefinition');

             expect(refUtils.getType('https://rally1.rallydev.com/slm/webservice/v2.0/typedefinition/-1234.js'))
                            .toEqual('typedefinition');

        });

        it('should handle permissions refs', function() {
             expect(refUtils.getType('/projectpermission/1234u5678p1'))
                            .toEqual('projectpermission');

             expect(refUtils.getType('https://rally1.rallydev.com/slm/webservice/v2.0/projectpermission/1234u5678p1.js'))
                            .toEqual('projectpermission');

             expect(refUtils.getType('/workspacepermission/1234u5678w1'))
                            .toEqual('workspacepermission');

             expect(refUtils.getType('https://rally1.rallydev.com/slm/webservice/v2.0/workspacepermission/1234u5678w1.js'))
                            .toEqual('workspacepermission');

            
             expect(refUtils.getType('https://rally1.rallydev.com/slm/webservice/v3.0/projectpermission/1637adf8-0830-4a48-9420-fb5bdb8575d6u3497d043-3ea7-4c2c-bf78-069847936c13w1'))
                            .toEqual('projectpermission');

             expect(refUtils.getType('https://rally1.rallydev.com/slm/webservice/v3.0/projectpermission/1637adf808304a489420fb5bdb8575d6u3497d0433ea74c2cbf78069847936c13w1'))
                            .toEqual('projectpermission');

             expect(refUtils.getType('/projectpermission/1637adf8-0830-4a48-9420-fb5bdb8575d6u3497d043-3ea7-4c2c-bf78-069847936c13w1'))
                            .toEqual('projectpermission');

             expect(refUtils.getType('/projectpermission/1637adf808304a489420fb5bdb8575d6u3497d0433ea74c2cbf78069847936c13w1'))
                            .toEqual('projectpermission');

             expect(refUtils.getType('https://rally1.rallydev.com/slm/webservice/v3.0/workspacepermission/1637adf8-0830-4a48-9420-fb5bdb8575d6u3497d043-3ea7-4c2c-bf78-069847936c13w1'))
                            .toEqual('workspacepermission');

             expect(refUtils.getType('https://rally1.rallydev.com/slm/webservice/v3.0/workspacepermission/1637adf808304a489420fb5bdb8575d6u3497d0433ea74c2cbf78069847936c13w1'))
                            .toEqual('workspacepermission');

             expect(refUtils.getType('/workspacepermission/1637adf8-0830-4a48-9420-fb5bdb8575d6u3497d043-3ea7-4c2c-bf78-069847936c13w1'))
                            .toEqual('workspacepermission');

             expect(refUtils.getType('/workspacepermission/1637adf808304a489420fb5bdb8575d6u3497d0433ea74c2cbf78069847936c13w1'))
                            .toEqual('workspacepermission');

        });
    });

    describe('#getId', function() {

        it('should handle non-refs', function() {
            expect(refUtils.getId('blah'))
                .toBeNull();

            expect(refUtils.getId(''))
                .toBeNull();

            expect(refUtils.getId(null))
                .toBeNull();

            expect(refUtils.getId({}))
                .toBeNull();

            expect(refUtils.getId({_ref: null}))
                .toBeNull();
        });

        it('should handle basic refs', function() {
            expect(refUtils.getId('/defect/1234'))
                         .toEqual('1234');

            expect(refUtils.getId('https://rally1.rallydev.com/slm/webservice/v2.0/defect/1234.js'))
                         .toEqual('1234');

            
            expect(refUtils.getId('https://rally1.rallydev.com/slm/webservice/v3.0/defect/3493b0493ea74c9abf78069487936c13'))
                         .toEqual('3493b0493ea74c9abf78069487936c13');

            expect(refUtils.getId('https://rally1.rallydev.com/slm/webservice/v3.0/defect/3493b049-3ea7-4c9a-bf78-069487936c13'))
                         .toEqual('3493b049-3ea7-4c9a-bf78-069487936c13');

            expect(refUtils.getId('/defect/3493b0493ea74c9abf78069487936c13'))
                         .toEqual('3493b0493ea74c9abf78069487936c13');

            expect(refUtils.getId('/defect/3493b049-3ea7-4c9a-bf78-069487936c13'))
                         .toEqual('3493b049-3ea7-4c9a-bf78-069487936c13');

        });

        it('should handle dynatype refs', function() {
            expect(refUtils.getId('/portfolioitem/feature/1234'))
                         .toEqual('1234');

            expect(refUtils.getId('https://rally1.rallydev.com/slm/webservice/v2.0/portfolioitem/feature/1234.js'))
                         .toEqual('1234');

            
            expect(refUtils.getId('https://rally1.rallydev.com/slm/webservice/v3.0/portfolioitem/feature/3493b049-3ea7-4c9a-bf78-069487936c13'))
                         .toEqual('3493b049-3ea7-4c9a-bf78-069487936c13');

            expect(refUtils.getId('https://rally1.rallydev.com/slm/webservice/v3.0/portfolioitem/feature/3493b0493ea74c9abf78069487936c13'))
                         .toEqual('3493b0493ea74c9abf78069487936c13');

            expect(refUtils.getId('/portfolioitem/feature/3493b049-3ea7-4c9a-bf78-069487936c13'))
                         .toEqual('3493b049-3ea7-4c9a-bf78-069487936c13');

            expect(refUtils.getId('/portfolioitem/feature/3493b0493ea74c9abf78069487936c13'))
                         .toEqual('3493b0493ea74c9abf78069487936c13');

        });

        it('should handle dynatype collection refs', function() {
            expect(refUtils.getId('/portfolioitem/feature/1234/children'))
                         .toEqual('1234');

            expect(refUtils.getId('https://rally1.rallydev.com/slm/webservice/v2.0/portfolioitem/feature/1234/children.js'))
                         .toEqual('1234');

            
            expect(refUtils.getId('https://rally1.rallydev.com/slm/webservice/v3.0/portfolioitem/feature/3493b049-3ea7-4c9a-bf78-069487936c13/children'))
                         .toEqual('3493b049-3ea7-4c9a-bf78-069487936c13');

            expect(refUtils.getId('https://rally1.rallydev.com/slm/webservice/v3.0/portfolioitem/feature/3493b0493ea74c9abf78069487936c13/children'))
                         .toEqual('3493b0493ea74c9abf78069487936c13');

            expect(refUtils.getId('/portfolioitem/feature/3493b049-3ea7-4c9a-bf78-069487936c13/children'))
                         .toEqual('3493b049-3ea7-4c9a-bf78-069487936c13');

            expect(refUtils.getId('/portfolioitem/feature/3493b0493ea74c9abf78069487936c13/children'))
                         .toEqual('3493b0493ea74c9abf78069487936c13');

        });

        it('should handle collection refs', function() {
            expect(refUtils.getId('/defect/1234/tasks'))
                         .toEqual('1234');

            expect(refUtils.getId('https://rally1.rallydev.com/slm/webservice/v2.0/defect/1234/tasks.js'))
                         .toEqual('1234');


            expect(refUtils.getId('https://rally1.rallydev.com/slm/webservice/v3.0/defect/3493b0493ea74c9abf78069487936c13/tasks'))
                         .toEqual('3493b0493ea74c9abf78069487936c13');

            expect(refUtils.getId('https://rally1.rallydev.com/slm/webservice/v3.0/defect/3493b049-3ea7-4c9a-bf78-069487936c13/tasks'))
                         .toEqual('3493b049-3ea7-4c9a-bf78-069487936c13');

            expect(refUtils.getId('/defect/3493b0493ea74c9abf78069487936c13/tasks'))
                         .toEqual('3493b0493ea74c9abf78069487936c13');

            expect(refUtils.getId('/defect/3493b049-3ea7-4c9a-bf78-069487936c13/tasks'))
                         .toEqual('3493b049-3ea7-4c9a-bf78-069487936c13');

        });

        it('should handle built-in refs', function() {
            expect(refUtils.getId('/typedefinition/-1234'))
                         .toEqual('-1234');

            expect(refUtils.getId('https://rally1.rallydev.com/slm/webservice/v2.0/typedefinition/-1234.js'))
                         .toEqual('-1234');

        });

        it('should handle permissions refs', function() {
            expect(refUtils.getId('/projectpermission/1234u5678p1'))
                         .toEqual('1234u5678p1');

            expect(refUtils.getId('https://rally1.rallydev.com/slm/webservice/v2.0/projectpermission/1234u5678p1.js'))
                         .toEqual('1234u5678p1');

            expect(refUtils.getId('/workspacepermission/1234u5678w1'))
                         .toEqual('1234u5678w1');

            expect(refUtils.getId('https://rally1.rallydev.com/slm/webservice/v2.0/workspacepermission/1234u5678w1.js'))
                         .toEqual('1234u5678w1');

            
            expect(refUtils.getId('https://rally1.rallydev.com/slm/webservice/v3.0/projectpermission/1637adf8-0830-4a48-9420-fb5bdb8575d6u3497d043-3ea7-4c2c-bf78-069847936c13w1'))
                         .toEqual('1637adf8-0830-4a48-9420-fb5bdb8575d6u3497d043-3ea7-4c2c-bf78-069847936c13w1');

            expect(refUtils.getId('https://rally1.rallydev.com/slm/webservice/v3.0/projectpermission/1637adf808304a489420fb5bdb8575d6u3497d0433ea74c2cbf78069847936c13w1'))
                         .toEqual('1637adf808304a489420fb5bdb8575d6u3497d0433ea74c2cbf78069847936c13w1');

            expect(refUtils.getId('/projectpermission/1637adf8-0830-4a48-9420-fb5bdb8575d6u3497d043-3ea7-4c2c-bf78-069847936c13w1'))
                         .toEqual('1637adf8-0830-4a48-9420-fb5bdb8575d6u3497d043-3ea7-4c2c-bf78-069847936c13w1');

            expect(refUtils.getId('/projectpermission/1637adf808304a489420fb5bdb8575d6u3497d0433ea74c2cbf78069847936c13w1'))
                         .toEqual('1637adf808304a489420fb5bdb8575d6u3497d0433ea74c2cbf78069847936c13w1');

            expect(refUtils.getId('https://rally1.rallydev.com/slm/webservice/v3.0/workspacepermission/1637adf808304a489420fb5bdb8575d6u3497d0433ea74c2cbf78069847936c13w1'))
                         .toEqual('1637adf808304a489420fb5bdb8575d6u3497d0433ea74c2cbf78069847936c13w1');

            expect(refUtils.getId('https://rally1.rallydev.com/slm/webservice/v3.0/workspacepermission/1637adf8-0830-4a48-9420-fb5bdb8575d6u3497d043-3ea7-4c2c-bf78-069847936c13w1'))
                         .toEqual('1637adf8-0830-4a48-9420-fb5bdb8575d6u3497d043-3ea7-4c2c-bf78-069847936c13w1');

            expect(refUtils.getId('/workspacepermission/1637adf808304a489420fb5bdb8575d6u3497d0433ea74c2cbf78069847936c13w1'))
                         .toEqual('1637adf808304a489420fb5bdb8575d6u3497d0433ea74c2cbf78069847936c13w1');

            expect(refUtils.getId('/workspacepermission/1637adf8-0830-4a48-9420-fb5bdb8575d6u3497d043-3ea7-4c2c-bf78-069847936c13w1'))
                         .toEqual('1637adf8-0830-4a48-9420-fb5bdb8575d6u3497d043-3ea7-4c2c-bf78-069847936c13w1');

        });
    });
});

