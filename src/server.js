"use strict";

require('ejs');
const cors = require('cors')
const express = require("express");
const app = express();
// const csrRouter = require("./routes/csr_routes")
const ssrRouter = require("./routes/destinations")
const unsplashRouter = require("./routes/unsplash_routes")

app.set( 'view engine', 'ejs' );
app.use( express.static('./public') )
app.use( cors() );
app.use( express.json() ) 
app.use( express.urlencoded( { extended:true }) )

app.use( ssrRouter );
// app.use( csrRouter );
app.use( unsplashRouter )

module.exports = {
    app:app,
    start: port => {
        if( !port ) throw new Error("ERR: no port detected");
        app.listen( port, () => console.log( `server listening port: ${ port }` ))
    }
}
