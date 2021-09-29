"use strict";

const express = require("express")
const app = express()
const itemRoutes = require("./itemRoutes")

// process JSON body => req.body
app.use(express.json());

// for every route in itemRoutes.js, apply "/items" prefix
app.use("/items", itemRoutes)



module.exports = app;