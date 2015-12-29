(function(){ 'use strict';

module.exports = function(value){
	return value !== null && typeof value === 'string';
};

})();