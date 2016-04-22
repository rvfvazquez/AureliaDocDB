var DocumentDBClient = require('documentdb').DocumentClient;

var DocDBUtils = {
    
    //   docdbUtils.getOrCreateCollection(self.client, sel.database._self, self.collectionId)
    //                 .then(function (coll) {
    //                     self.collection = coll;
    //                 }, function (err) {
    //                     return err;
    //                 });
    getOrCreateDatabase: function (client, databaseId) {
       
        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id=@id',
            parameters: [{
                name: '@id',
                value: databaseId
            }]
        };

//        client.queryDatabases(querySpec).toArray().then(function(results) {
            client.queryDatabases(querySpec).then(function(results) {
      
                if (results.length === 0) {
                    var databaseSpec = {
                        id: databaseId
                    };

                    client.createDatabase(databaseSpec).then(function (created) {
                        return created;
                    });

                } else {
                    //callback(null, results[0]);
                    return results[0];
        }},function (err){return err;}
            
       );
    },

    getOrCreateCollection: function (client, databaseLink, collectionId) {
       
        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id=@id',
            parameters: [{
                name: '@id',
                value: collectionId
            }]
        };             

        client.queryCollections(databaseLink, querySpec).toArray().then(function ( results) {
               
                if (results.length === 0) {
                    var collectionSpec = {
                        id: collectionId
                    };

                    var requestOptions = {
                        offerType: 'S1'
                    };

                    client.createCollection(databaseLink, collectionSpec, requestOptions, function (err, created) {
                        //callback(null, created);
                        return created;
                    });

                } else {
                    //callback(null, results[0]);
                    return results[0];
                }
            },
            function (err){return err;}
        );
    }};

module.exports = DocDBUtils;