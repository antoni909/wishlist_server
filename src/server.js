"use strict";
const fetch = require("node-fetch")
const cors = require('cors')
const express = require("express");
const app = express();
const { getDb } = require("./mongoDB");
const { ObjectId } = require("mongodb");
const baseURL = process.env.UNSPLASH_BASE_URL

// 
app.use(cors());
app.use( express.json() ) 
app.use( express.urlencoded({ extended:true }))

app.get('/', (req, res) => {
    res.send("server is gtg")
})
app.get('/unsplash/:query', (req, res) => {
    const { query } = req.params
    fetch(`${baseURL}/search/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&page=1&per_page=1&query=${query}}`)
        .then( response => response.json() )
        .then( data => {
            const imgURL = data.results[0].urls["regular"]
            console.log(imgURL)
            res.send({imgURL})
        })
        .catch( err => console.log(err) )
})
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
            res.send(result)
        })
        .catch( err => console.log(err) )
})
app.put("/destinations/", (req, res) => {
    const conn = getDb()
    const filter = { "_id" : ObjectId(req.body._id) }
    const options = { upsert: true }
    const updateDoc = { 
        $set: { 
            destination: req.body.updatedDestination, 
            description: req.body.updatedDescription, 
            location: req.body.updatedLocation, 
            url: req.body.url 
        } 
    }
    
    conn
       .collection("destinations")
       .updateOne(filter, updateDoc, options)
       .then( result => {
            if( result.upsertedCount > 0 ) {
                console.log(`inserted new document ${result}` )
                res.send(result)
            }
            else {
                console.log("1 document was updated successfully")
                res.send(result)
            }
       })

})
app.delete("/destinations/:id", (req,res) => {
    const conn = getDb()
    let { id } = req.params
    conn
       .collection("destinations")
       .deleteOne( { "_id" : ObjectId(id) } )
       .then( result => {
           console.log(result)
           res.send(result)
       })
       .catch( err => console.log(err) )
})

module.exports = {
    app:app,
    start: port => {
        if( !port ) throw new Error("ERR: no port detected");
        app.listen( port, () => console.log( `server listening port: ${ port }` ))
    }
}