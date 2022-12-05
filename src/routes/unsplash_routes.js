const express = require('express');
const router = express.Router();
const fetch = require("node-fetch")
const unsplashURL = process.env.UNSPLASH_BASE_URL

router.get('/unsplash/:query', one_unsplashImageURL )

function one_unsplashImageURL(req,res){
    const { query } = req.params
    fetch(`${ unsplashURL }/search/photos?client_id=${ process.env.UNSPLASH_ACCESS_KEY }&page=1&per_page=1&query=${ query }}`)
        .then( response => response.json() )
        .then( data => {
            const imgURL = data.results[0].urls["regular"]
            res.send({imgURL})
        })
        .catch( err => console.log(err) )
}



module.exports = router