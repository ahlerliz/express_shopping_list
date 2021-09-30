"use strict";

const express = require("express")
const app = express()
const itemRoutes = require("./itemRoutes")
const { NotFoundError } = require("./expressError");

// process JSON body => req.body
app.use(express.json());

// for every route in itemRoutes.js, apply "/items" prefix
app.use("/items", itemRoutes)



/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
    return next(new NotFoundError());
  });
 
/** Global error handler */
app.use(function (err, req, res, next) {
    const status = err.status || 500;
    const message = err.message;
    if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
    return res.status(status).json({ error: { message, status } });
  });

module.exports = app;