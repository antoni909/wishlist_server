// "use strict";

/* LEGACY CODE */

// const { MongoClient } = require("mongodb");
// const connectionString = process.env.ATLAS_URI

// Connect with MongoClient 

// const client = new MongoClient(connectionString, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// let dbConnection;

// module.exports = {
//   connectToServer: ( cb ) => {
//     client.connect( 
//         (err, database) => {
//             if (err || !database) return cb(err)
//             dbConnection = database.db("wishlist");
//             console.log( "connected db: ", dbConnection.s.namespace.db );
//             return cb();
//         }
//     );
//   },
//   getDb: () => dbConnection 
// };



// const { connectToServer } = require("./src/mongoDB")
// connectToServer( 
//     ( err ) => { 
//         if ( err ) console.log(err)
//         start( PORT )
//     }
// )



// const { getDb } = require("./mongoDB");
// REST 
// app.get("/destinations", all_destinations );
// app.get("/destinations/:id",one_destination_ByID );
// app.post("/destinations", create_destination )
// app.put("/destinations/", update_destinationByID )
// app.delete("/destinations/:id", delete_destinationByID)

// Handlers
// function all_destinations(req,res){
//     const conn = getDb()
//     conn
//         .collection("destinations")
//         .find({})
//         .toArray()
//         .then( result => {
//             res.send(result)
//         })
//         .catch( err => console.log(err) )
// }
// function one_destination_ByID(req,res){
//     const conn = getDb()
//     const { id } = req.params
//     conn
//         .collection("destinations")
//         .findOne({ "_id": ObjectId(id) })
//         .then( result => {
//             res.send(result)
//         })
//         .catch( err => console.log(err) )
// }
// function create_destination(req,res){
//     const conn = getDb()
//     let { destination, location, url, description } = req.body
//     let destinationsDocument = {
//         destination: destination,
//         location: location,
//         url: url,
//         description: description,
//     }
//     conn
//         .collection("destinations")
//         .insertOne( destinationsDocument )
//         .then( result => {
//             res.send(result)
//         })
//         .catch( err => console.log(err) )
// }
// function update_destinationByID(req,res){
//     const conn = getDb()
//     const filter = { "_id" : ObjectId(req.body._id) }
//     const options = { upsert: true }
//     const updateDoc = { 
//         $set: { 
//             destination: req.body.updatedDestination, 
//             description: req.body.updatedDescription, 
//             location: req.body.updatedLocation, 
//             url: req.body.url 
//         } 
//     }
    
//     conn
//        .collection("destinations")
//        .updateOne(filter, updateDoc, options)
//        .then( result => {
//             if( result.upsertedCount > 0 ) {
//                 console.log(`inserted new document ${result}` )
//                 res.send(result)
//             }
//             else {
//                 console.log("1 document was updated successfully")
//                 res.send(result)
//             }
//        })
// }
// function delete_destinationByID(req,res){
//     const conn = getDb()
//     let { id } = req.params
//     conn
//        .collection("destinations")
//        .deleteOne( { "_id" : ObjectId(id) } )
//        .then( result => {
//            res.send(result)
//        })
//        .catch( err => console.log(err) )
// }
