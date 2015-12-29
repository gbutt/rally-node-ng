(function(){ 'use strict'; 

/**
 Get the workspace schema
 @param {object} workspace - The workspace object
 - @member {string} ObjectID
 - @member {object} SchemaVersion
 @return {promise}
 */
var schema = function(workspace) {
    var self = this;

    function getWorkspace(ObjectID) {
            var ref;
            if (ObjectID) {
                ref = '/workspace/'+ObjectID;
            } else {
                ref = '/workspace';
            }
            return self.get(ref, { fetch: 'ObjectID,SchemaVersion' }, { cache: true })
            .then(function(result) {
                return result.Results[0];
            });
    }

    function getSchema(workspace) {
        var url = self.request.schemaUrl+
            '/workspace/'+workspace.ObjectID+'/'+workspace.SchemaVersion;
        return self.httpGet({url: url, cache: true});
    }
    
    // fetch workspace if null or invalid - we need the OID and SchemaVersion
    workspace = workspace || {};
    var promise;
    if (!workspace.ObjectID || !workspace.SchemaVersion) {
        promise = getWorkspace(workspace.ObjectID)
            .then(function(workspace){
                return getSchema(workspace);
            });
    } else {
        promise = getSchema(workspace);
    }
    return promise;
};

module.exports = schema;

})();