var _ = require('lodash'),
    optionsToRequestOptions = require('./internal/optionsToRequestOptions');

/**
 Get the workspace schema
 @param {object} workspace - The workspace object
 - @member {string} ObjectID
 - @member {object} SchemaVersion
 @param {function} callback - A callback to be called when the operation completes
 - @param {string[]} errors - Any errors which occurred
 - @param {object} result - the operation result
 @return {promise}
 */
function schema(workspace) {
    var self = this;
    // fetch workspace if null or invalid - we need the OID and SchemaVersion
    workspace = workspace || {};
    if (!workspace.ObjectID || !workspace.SchemaVersion) {
        var promise = getWorkspace.call(self, workspace.ObjectID)
            .then(function(workspace){
                return getSchema.call(self,workspace);
            });
    } else {
        var promise = getSchema.call(self, workspace);
    }
    return promise;

    function getWorkspace(ObjectID) {
         var options = {
                fetch: 'ObjectID,SchemaVersion',
                limit: 1,
                requestOptions: { cache: true }
            };
            if (ObjectID) {
                options.ref = '/workspace/'+ObjectID;
            } else {
                options.type = 'workspace';
            }
            return this.query(options).then(function(result) {
                return result.Results[0];
            });
    }

    function getSchema(workspace) {
        var url = this.request.schemaUrl+'/workspace/'+workspace.ObjectID+'/'+workspace.SchemaVersion
        return this.request.get({url: url, cache: true});
    }
}





module.exports = schema;