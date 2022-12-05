"use strict";

require('ejs');
const express = require("express");
const { ObjectId } = require("mongodb");
const { Destination } = require("../schema/destination_schema")
const router = express.Router();

// Mongoose CSR
router.get("/csr/", (req,res)=> { 
    const msg = " availabel routes: GET/destination"
    res.send( msg ) 
})
router.get("/csr/destinations", (req, res) => {
    Destination.find({}).then( result => res.send( result ) )
})
router.get("/csr/destinations/:id",(req,res) => {
    const { id } = req.params
    Destination
        .findOne({ _id: ObjectId(id) })
        .then( result => {
            res.send(result)
        })
        .catch( err => console.log( err ) ) 
})
router.post("/csr/destinations", (req,res) => {
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
router.put("/csr/destinations/", ( req,res ) => {
    const destinationsDocument = {
        description: req.body.updatedDescription,
        destination: req.body.updatedDestination,
        location: req.body.updatedLocation,
        url: req.body.url,
    }
    Destination
        .findByIdAndUpdate( req.body._id, destinationsDocument, { overwrite:true } )
        .then( result => res.send( result ) )
        .catch( err => console.log( err ) )
})
router.delete("/csr/destinations/:id", (req,res) => {
    let { id } = req.params
    Destination
        .deleteOne( {_id: ObjectId(id)} )
        .then( result => {
            res.send( result ) 
        })
        .catch( err => console.log( err ) )
})

module.exports = router;
