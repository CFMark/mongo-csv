var express = require("express");
var router = express.Router();
var db = require("../models");
var shipStationAPI = require("../apis/shipstation");

// router.get("/", function(req, res) {
//     res.render("index");
// });

router.get("/", function(req, res) {
    var date = req.params.date;

    //if no date has been provided-- use today's date
    if(date === undefined){
      //set variable to today's date and remove the time data
      var today = new Date().toISOString().split("T")[0];
    }
  
    //here we set up a query object to pass to the Shipstation API controller method we imported 
    var reqParams = {
      'shipDateStart': `${today}%2000:00:00`,
      'includeShipmentItems': true,
    }
  
    shipStationAPI.get('/updateShipments', reqParams, function (data) {

        // var shipment =  data.shipments[0];
        // console.log(shipment.shipmentId);
        //      db.Shipment.create(shipment)
        //                 .then(function (resp) {
        //                     console.log(`Successfully Added: \n${resp}`);
        //                 })
        //                 .catch(function (err) {
        //                    console.log(err);
        //                 })
        for (var i = 0; i < data.shipments.length; i++) {
            var shipment = data.shipments[i]; 
            console.log(shipment);

            db.Shipment.create(shipment)
                        .then(function (resp) {
                            console.log(`Successfully Added: \n${resp}`);
                        })
                        .catch(function (err) {
                           console.log(err);
                        })
        }
        res.send("index", data);
        
    });
});

module.exports = router;
