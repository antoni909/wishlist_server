"use strict";

const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const { getDb } = require("./mongoDB")

// APP MW
// app.use( express.static('public') )
app.use( bodyParser.json() ) // used by server to accept JSON data
app.use( bodyParser.urlencoded({ extended:true }))// urlencoded - extracts data from form el's and adds them to req.body

// ROUTES

// Sanity check
app.get('/sanity', (req, res) => {
    res.send("server is gtg")
})

// List Destinations
app.get("/", (req, res) => {
    const conn = getDb()
    conn
        .collection("destinations")
        .find({})
        .toArray()
        .then( result => {
            console.log(result)
            res.send(result)
        })
        .catch( err => console.log(err) )
});

// Create New Destinations
app.post("/destinations", (req,res) => {
    const conn = getDb()
    conn
        .collection("destinations")
        .insertOne( req.body )
        .then( result => {
            res.redirect("/")
        })
        .catch( err => console.log(err) )
})``


// ERR Handlers

module.exports = {
    app:app,
    start: port => {
        if( !port ) throw new Error("ERR: no port detected");
        app.listen( port, () => console.log( `server listening port: ${port}` ))
    }
}