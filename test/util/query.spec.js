var queryUtils = require('../../src/util/query');

describe('Query', function() {

    describe('#toQueryString', function() {

        it('should handle a simple query', function() {
            var query = queryUtils
                .where('Name', 'contains', 'foo')
                .toQueryString();

            expect(query).toEqual('(Name contains foo)');
        });

        it('should handle a query with a non-string value', function() {
            var query = queryUtils
                .where('DirectChildrenCount', '>', 0)
                .toQueryString();

            expect(query).toEqual('(DirectChildrenCount > 0)');
        });

        it('should handle a null value', function() {
            var query = queryUtils
                .where('Iteration', '=', null)
                .toQueryString();

            expect(query).toEqual('(Iteration = null)');
        });

        it('should handle a ref value', function() {
            var query = queryUtils
                .where('Iteration', '=', 'https://rally1.rallydev.com/slm/webservice/v2.0/iteration/12345')
                .toQueryString();

            expect(query).toEqual('(Iteration = /iteration/12345)');
        });

        it('should handle a value with spaces', function() {
            var query = queryUtils
                .where('Name', 'contains', 'foo bar')
                .toQueryString();

            expect(query).toEqual('(Name contains "foo bar")');
        });

        it('should handle a value with spaces', function() {
            var query = queryUtils
                .where('Name', 'contains', 'foo bar')
                .toQueryString();

            expect(query).toEqual('(Name contains "foo bar")');
        });

        it('should handle nested queries', function() {
            var query = queryUtils
                .where('Tags.Name', 'contains', 'foo')
                .and('Owner', '=', '/user/1234').toQueryString();

            expect(query).toEqual('((Tags.Name contains foo) AND (Owner = /user/1234))');
        });
    });

    describe('#and', function() {

        it('should combine two queries', function() {
            var q = queryUtils
                .where('Name', 'contains', 'foo')
                .and('Owner', '=', '/user/1234');
            var expectedQuery = '((Name contains foo) AND (Owner = /user/1234))';

            expect(q.left.left).toEqual('Name');
            expect(q.left.op).toEqual('contains');
            expect(q.left.right).toEqual('foo');
            expect(q.op).toEqual('AND');
            expect(q.right.left).toEqual('Owner');
            expect(q.right.op).toEqual('=');
            expect(q.right.right).toEqual('/user/1234');
            expect(q.toQueryString()).toEqual(expectedQuery);
        });

        it('should combine three queries, including an or', function() {
            var q = queryUtils
                .where('Name', 'contains', 'foo')
                .and('Owner', '=', '/user/1234')
                .or('ScheduleState', '<', 'Accepted');
            var expectedQuery = '(((Name contains foo) AND (Owner = /user/1234)) OR (ScheduleState < Accepted))';

            expect(q.left.left.left).toEqual('Name');
            expect(q.left.left.op).toEqual('contains');
            expect(q.left.left.right).toEqual('foo');
            expect(q.left.op).toEqual('AND');
            expect(q.left.right.left).toEqual('Owner');
            expect(q.left.right.op).toEqual('=');
            expect(q.left.right.right).toEqual('/user/1234');
            expect(q.op).toEqual('OR');
            expect(q.right.left).toEqual('ScheduleState');
            expect(q.right.op).toEqual('<');
            expect(q.right.right).toEqual('Accepted');
            expect(q.toQueryString()).toEqual(expectedQuery);
        });
    });

    describe('#or', function() {

        it('should combine two queries', function() {
            var q = queryUtils
                .where('Name', 'contains', 'foo')
                .or('Owner', '=', '/user/1234');
            var expectedQuery = '((Name contains foo) OR (Owner = /user/1234))';

            expect(q.left.left).toEqual('Name');
            expect(q.left.op).toEqual('contains');
            expect(q.left.right).toEqual('foo');
            expect(q.op).toEqual('OR');
            expect(q.right.left).toEqual('Owner');
            expect(q.right.op).toEqual('=');
            expect(q.right.right).toEqual('/user/1234');
            expect(q.toQueryString()).toEqual(expectedQuery);
        });

        it('should combine three queries, including an and', function() {
            var q = queryUtils
                .where('Name', 'contains', 'foo')
                .or('Owner', '=', '/user/1234')
                .and('ScheduleState', '<', 'Accepted');
            var expectedQuery = '(((Name contains foo) OR (Owner = /user/1234)) AND (ScheduleState < Accepted))';

            expect(q.left.left.left).toEqual('Name');
            expect(q.left.left.op).toEqual('contains');
            expect(q.left.left.right).toEqual('foo');
            expect(q.left.op).toEqual('OR');
            expect(q.left.right.left).toEqual('Owner');
            expect(q.left.right.op).toEqual('=');
            expect(q.left.right.right).toEqual('/user/1234');
            expect(q.op).toEqual('AND');
            expect(q.right.left).toEqual('ScheduleState');
            expect(q.right.op).toEqual('<');
            expect(q.right.right).toEqual('Accepted');
            expect(q.toQueryString()).toEqual(expectedQuery);
        });
    });
});

