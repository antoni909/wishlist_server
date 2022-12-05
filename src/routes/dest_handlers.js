"use strict";

const { ObjectId } = require("mongodb");
const { Destination } = require("../schema/destination_schema")
const fetch = require("node-fetch")
const unsplashURL = process.env.UNSPLASH_BASE_URL

const  getUnsplashImgURL = async ( query ) => {
    return fetch(`${ unsplashURL }/search/photos?client_id=${ process.env.UNSPLASH_ACCESS_KEY }&page=1&per_page=1&query=${ query }}`)
        .then( response => response.json() )
        .then( data => {
            return data.results[0].urls["regular"]
        })
        .catch( err => console.log(err) )
}

module.exports = {
    showAll: (req, res) => {
        Destination.find({})
            .then( result => {
                res.render( "pages/index.ejs", { destinations: result } )
            })
            .catch( err => console.error( err ) )
    },
    createOne: (req, res) => {
        let { destination, location, description } = req.body
        const promise = getUnsplashImgURL( destination )
        promise.then( imgURL => {
            let destinationsDocument = {
                destination: destination,
                location: location,
                url: imgURL,
                description: description,
            }
            Destination
                .create( destinationsDocument )
                .then( () => res.redirect("/"))
                .catch( err => console.log( err ) )
        })
    },
    updateOne: (req,res)=> {
        let { id } = req.params
        const document = req.body
        const promise = getUnsplashImgURL( document.destination )
        promise.then( imgURL => {
            const  updatedDocument = { ...req.body,url: imgURL}
            Destination
                .findByIdAndUpdate( id, updatedDocument, { overwrite:true } )
                .then( () => res.redirect(201, "/" ) )
                .catch( err => console.log( err ) )
        })
    },
    deleteOne: (req,res)=> {
        let { id } = req.params
        Destination
            .deleteOne({ _id: ObjectId(id) } )
            .then( () => res.redirect(200,"/") )
            .catch( err => console.log( err ) )
    
    }
}