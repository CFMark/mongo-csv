var express = require("express");
var router = express.Router();
var db = require("../models");
var updateDB = require("../db/updateDB");

router.get("/", function (req, res) {
  res.render("index");
});


// router.get("/orders", function (req, res) {

//   var queryObj = { orderId: "563222673" }

//   var q = db.Order.find(queryObj, function (err, docs) {
//     if (err) {
//       console.log(err);
//     }
//     console.log(docs);
//     res.render("index", docs);
//   });

// });

// router.get("/shipments", function (req, res) {

//   var queryObj = { orderId: "563222673" }

//   var q = db.Shipment.find(queryObj, function (err, docs) {
//     if (err) {
//       console.log(err);
//     }
//     console.log(docs);
//     res.render("index", docs);
//   });

// });

router.get("/updatedb", function (req, res) {

  updateDB.init(res);

});

module.exports = router;
