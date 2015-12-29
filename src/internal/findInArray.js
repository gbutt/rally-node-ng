(function(){ 'use strict';

/*jshint maxlen:false*/
// polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
/*jshint maxlen:80*/

function findInArray(arry, predicate) {
	if (Array.prototype.find) {
		return arry.find(predicate);	
	}
	return find(arry, predicate);
}

function find(arry, predicate) {
	if (arry === null) {
	  throw new TypeError('Array.find called on null or undefined');
	}
	if (typeof predicate !== 'function') {
	  throw new TypeError('predicate must be a function');
	}
	var list = Object(arry);
	var length = list.length || 0;
	var thisArg = arguments[1];
	var value;

	for (var i = 0; i < length; i+=1) {
	  value = list[i];
	  if (predicate.call(thisArg, value, i, list)) {
	    return value;
	  }
	}
	return undefined;
}



module.exports = findInArray;

})();