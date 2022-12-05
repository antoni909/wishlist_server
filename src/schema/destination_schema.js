"use strict";

const { mongoose, Schema } = require("mongoose");

const destinationSchema = new Schema({
    destination: { type: String, required: true },
    location: { type: String, default: "lorem ipsum" },
    description: { type: String, default: "lorem ipsum" },
    url: { type: String, default: process.env.DEFAULT_PLACEHOLDER_IMG },
})

const Destination = mongoose.model("Destination", destinationSchema)

module.exports = { Destination }