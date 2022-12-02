"use strict";

const express = require("express");
const router = express.Router();

// Mongoose SSR
router.get("/ssr/", (req, res) => {
    res.render( "pages/index.ejs", {})
})

router.get("/ssr/practice", (req, res) => {
    const someVar = "dynamic aint it?"
    var mascots = [
        { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
        { name: 'Tux', organization: "Linux", birth_year: 1996},
        { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
      ];
    res.render( "pages/practice.ejs", {
        title: someVar,
        mascots: mascots
    })

})

module.exports = router