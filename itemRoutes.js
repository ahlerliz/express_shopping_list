const express = require("express");

const db = require("./fakeDb");
const router = new express.Router();
const app = require("./app");

let { items } = require("./fakeDb")  // potential issue with the {items}

// process JSON body => req.body
//app.use(express.json());


/** GET /items/: get shopping list */
router.get("/", function (req, res, next) {
  return res.json({items});
});

/** DELETE /users/[id]: delete user, return {message: Deleted} */
router.post("/", function (req, res, next) {
  let name = req.body.name;
  let price = req.body.price;

  items.push({name, price});

  return res.json({ added: {name, price} });
});

module.exports = router;