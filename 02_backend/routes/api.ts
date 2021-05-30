const express = require("express")
const router = express.Router()
import { MongoDB } from "../src/MongoDB"

const mongo = new MongoDB("WhatToEat")

router.get("/getRecipes", (req, res) => {
  mongo.getRecipes().then((value) => {
    res.status(200).send(value)
  })
})

router.post("/addRecipe", (req, res) => {
  mongo.insertDocuments(req.body)
  res.sendStatus(200)
})

router.post("/deleteRecipe", (req, res) => {
  mongo.deleteRecipe(req.body.recipeId)
  res.sendStatus(200)
})

router.post("/changeRecipe", (req, res) => {
  mongo.changeRecipe(req.body)
  res.sendStatus(200)
})

router.post("/modifyBox", (req, res) => {
  mongo.updateValue(req.body[0], { box: req.body[1].box })
  res.sendStatus(200)
})

router.post("/updateRecipeBoxes", (req, res) => {
  for (const id in req.body) {
    mongo.updateValue(id, { box: req.body[id].box })
  }
  res.sendStatus(200)
})

router.post("/addBookmark", (req, res) => {
  mongo.addBookmark(req.body)
  res.sendStatus(200)
})

router.post("/removeBookmark", (req, res) => {
  mongo.removeBookmark(req.body)
  res.sendStatus(200)
})

router.get("/getBookmarks", (req, res) => {
  mongo.getBookmarks().then((value) => {
    res.status(200).send(value)
  })
})

module.exports = router
