"use strict";

const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const { getDb } = require("./mongoDB");
const { ObjectId } = require("mongodb");

// APP MW
app.use( bodyParser.json() ) // used by server to accept JSON data
app.use( bodyParser.urlencoded({ extended:true }))// urlencoded - extracts data from form el's and adds them to req.body

// ROUTES / CONTROLLERS
// Sanity check
app.get('/', (req, res) => {
    res.send("server is gtg")
})
// List All Destinations
app.get("/destinations", (req, res) => {
    const conn = getDb()
    conn
        .collection("destinations")
        .find({})
        .toArray()
        .then( result => {
            res.send(result)
        })
        .catch( err => console.log(err) )
});
// List One
app.get("/destinations/:id", (req, res) => {
    const conn = getDb()
    const { id } = req.params
    conn
        .collection("destinations")
        .findOne({ "_id": ObjectId(id) })
        .then( result => {
            console.log(result)
            res.send(result)
        })
        .catch( err => console.log(err) )
});
// Create New Destinations
app.post("/destinations", (req,res) => {
    const conn = getDb()
    let { destination, location, url, description } = req.body
    let destinationsDocument = {
        destination: destination,
        location: location,
        url: url,
        description: description,
    }
    conn
        .collection("destinations")
        .insertOne( destinationsDocument )
        .then( result => {
            // let {insertedId, acknowledged} = result
            res.send("success")
        })
        .catch( err => console.log(err) )
})
// Update Existing Destination
app.put("/destinations/", (req, res) => {
    const conn = getDb()
    let { destination, location, url, description, _id } = req.body
    const filter = { "_id" : ObjectId(_id) }
    const options = {upsert: true}
    const updateDoc = { $set: { destination,location,url,description} }
    conn
       .collection("destinations")
       .updateOne(filter, updateDoc, options)
       .then( result => {
            console.log(result)
            if( result.upsertedCount > 0 ) {
                console.log(`inserted new document ${result}` )
            }
            else {
                console.log("1 document was updated successfully")
                res.send("success")
            }
       })
})
// Delete One Destination
app.delete("/destinations/:id", (req,res) => {
    const conn = getDb()
    let { id } = req.params
    conn
       .collection("destinations")
       .deleteOne( { "_id" : ObjectId(id) } )
       .then( result => {
           console.log(result)
           console.log(result.insertedId)
           res.send("success")
       })
       .catch( err => console.log(err) )
})

// ERR Handlers

module.exports = {
    app:app,
    start: port => {
        if( !port ) throw new Error("ERR: no port detected");
        app.listen( port, () => console.log( `server listening port: ${port}` ))
    }
}