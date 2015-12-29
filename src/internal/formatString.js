(function(){ 'use strict';
/*jshint maxlen:false*/
// from http://stackoverflow.com/questions/18405736/is-there-a-c-sharp-string-format-equivalent-in-javascript
/*jshint maxlen:80*/
function format(str) {
    var args = arguments;
    return str.replace(/(\{\{\d\}\}|\{\d\})/g, function (str) {
        if (str.substring(0, 2) === '{{') {
        	return str;
        }
        var index = parseInt(str.match(/\d/)[0]);
        return args[index + 1];
    });
}

module.exports = format;

})();