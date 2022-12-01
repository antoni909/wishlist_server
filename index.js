"use strict";

require('dotenv').config()
const PORT = process.env.PORT || 4001
const { start } = require("./src/server")
const { connectToServer } = require("./src/mongoDB")

connectToServer( 
    ( err ) => { 
        if ( err ) console.log(err)
        start( PORT )
    }
)
