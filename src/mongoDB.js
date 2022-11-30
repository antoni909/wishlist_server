"use strict";

const { MongoClient } = require("mongodb");
const connectionString = process.env.ATLAS_URI

const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: ( cb ) => {
    client.connect( 
        (err, database) => {
            if (err || !database) return cb(err)
            dbConnection = database.db("wishlist");
            console.log( "connected db: ", dbConnection.s.namespace.db );
            return cb();
        }
    );
  },

  getDb: () => dbConnection 
};
