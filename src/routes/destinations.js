"use strict";

const express = require("express");
const router = express.Router();
const { showAll, createOne, updateOne, deleteOne } = require("../controllers/dest_handlers")

router.get("/", showAll)
router.post("/destinations", createOne)
router.put("/destination/:id", updateOne)
router.delete("/destination/:id", deleteOne )

module.exports = router