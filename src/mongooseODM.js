"use strict";
const { start } = require("./server")
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4001
const connectionString = process.env.ATLAS_URI_MONGOOSE

module.exports = { 
    runApp: () => {
        mongoose.connect( connectionString, {
            useNewUrlParser: true,
        })
        .then( () => {
            console.log("connected to mongoDB ")
            start(PORT)
        })
        .catch( (err) => {
            console.log("ERR: ", err)
        })
    },
    stopApp: () => mongoose.disconnect(),
}
