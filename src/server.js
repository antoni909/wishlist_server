"use strict";

const fetch = require("node-fetch")
const cors = require('cors')
const express = require("express");
const app = express();
const { ObjectId } = require("mongodb");
const { Destination } = require("./schema/destination_schema")
const unsplashURL = process.env.UNSPLASH_BASE_URL

app.use(cors());
app.use( express.json() ) 
app.use( express.urlencoded({ extended:true }))

app.get('/', (req, res) => res.send("server is gtg") )
app.get('/unsplash/:query', one_unsplashImageURL )

app.get("/destinations", (req, res) => {
    Destination.find({}).then( result => res.send( result ) )
});
app.get("/destinations/:id",(req,res) => {
    const { id } = req.params
    Destination
        .findOne({ _id: ObjectId(id) })
        .then( result => {
            res.send(result)
        })
        .catch( err => console.log( err ) ) 
})
app.post("/destinations", (req,res) => {
    let { destination, location, url, description } = req.body
    let destinationsDocument = {
        destination: destination,
        location: location,
        url: url,
        description: description,
    }
    Destination
        .create(destinationsDocument)
        .then( result => {
            res.send( result )
        })
        .catch( err => console.log( err ) )
})
app.put("/destinations/", ( req,res ) => {
    const destinationsDocument = {
        description: req.body.updatedDescription,
        destination: req.body.updatedDestination,
        location: req.body.updatedLocation,
        url: req.body.url,
    }
    Destination
        .findByIdAndUpdate( req.body._id, destinationsDocument, { overwrite:true } )
        .then( result => {
            res.send( result )
        } 
        )
        .catch( err => console.log( err ) )
})
app.delete("/destinations/:id", (req,res) => {
    let { id } = req.params
    Destination
        .deleteOne( {_id: ObjectId(id)} )
        .then( result => {
            res.send( result ) 
        })
        .catch( err => console.log( err ) )
})

function one_unsplashImageURL(req,res){
    const { query } = req.params
    fetch(`${unsplashURL}/search/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&page=1&per_page=1&query=${query}}`)
        .then( response => response.json() )
        .then( data => {
            const imgURL = data.results[0].urls["regular"]
            res.send({imgURL})
        })
        .catch( err => console.log(err) )
}

module.exports = {
    app:app,
    start: port => {
        if( !port ) throw new Error("ERR: no port detected");
        app.listen( port, () => console.log( `server listening port: ${ port }` ))
    }
}
