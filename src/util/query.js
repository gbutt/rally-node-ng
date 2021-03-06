(function(){ 'use strict';


var isString = require('../internal/isString'),
    format = require('../internal/formatString'),
    refUtils = require('./ref');
/**
 @module Query

 This module contains utility methods for working with the Rally query syntax
 */

function Query(left, op, right) {
    this.left = left;
    this.op = op;
    this.right = right;
}

Query.prototype.toQueryString = function() {
    var left = this.left,
        right = this.right;
    if(left.toQueryString) {
        left = left.toQueryString();
    }

    if(right === null) {
        right = 'null';
    } else if(right.toQueryString) {
        right = right.toQueryString();
    } else if(refUtils.isRef(right)) {
        right = refUtils.getRelative(right);
    } else if(isString(right) && right.indexOf(' ') >= 0) {
        right = format('"{0}"', right);
    }

    return format('({0} {1} {2})', left, this.op, right);
};

Query.prototype.and = function(left, op, right) {
    return new Query(this, 'AND', left.toQueryString ? left : new Query(left, op, right));
};

Query.prototype.or = function(left, op, right) {
    return new Query(this, 'OR', left.toQueryString ? left : new Query(left, op, right));
};

function where(left, op, right) {
    return new Query(left, op, right);
}

module.exports = {
    where: where
};

})();