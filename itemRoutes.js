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

/** POST /items/ add new item and return {added: {name:name, price:price}} */
router.post("/", function (req, res, next) {
  let name = req.body.name;
  let price = req.body.price;

  items.push({name, price});

  return res.json({ added: {name, price} });
});

/** GET single item from /items/:name return {{name:name, price:price}} */
router.get("/:name", function (req, res, next) {  
  let name = req.params.name;

  let singleItem = items.filter(n => n.name === name)
  let item = singleItem[0]

  return res.json(item);
});

/** PATCH /items/name edit item and edited {added: {name:name, price:price}} */
router.patch("/:name", function (req, res, next) {
  let oldName = req.params.name;
  // let price = req.body.price;

  let singleItem = items.filter(n => n.name === oldName)
  let item = singleItem[0]

  let itemIndex = items.indexOf(item)

  if(req.body.name){
    item.name =req.body.name
  }else if(req.body.price){
    item.price =req.body.price
  }

  items[itemIndex] = item

  return res.json({ updated: {item} });
});

/** DELETE /items/name delete item and return {message:deleted} */
router.delete("/:name", function (req, res, next) {
  let name = req.params.name;

  let singleItem = items.filter(n => n.name === name)

  let item = singleItem[0]

  let itemIndex = items.indexOf(item)

  console.log("this is item index",itemIndex)

  items.splice(itemIndex,1)

  return res.json({ message: "deleted" });
});


module.exports = router;