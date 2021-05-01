const express = require("express")
const router = express.Router()
import { MongoDB } from "../src/MongoDB"

const mongo = new MongoDB("WhatToEat")

router.get("/getRecipes", (req, res) => {
  mongo.getRecipes().then((value) => {
    res.status(200).send(value)
  })
})

module.exports = router
