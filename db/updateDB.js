var db = require("../models");
var shipStationAPI = require("../apis/shipstationAPI");
var updateDB = {

  dateDiff: function (initial, final) {
    //create a recursive function that assesses the date and adds a 
    var dates = [];

    function checkDates(init, fin) {
      // console.log("INIT:"+init);
      // console.log("FIN:"+fin);

      //init.setTime(00);

      init.setHours(00);
      init.setMinutes(00);
      init.setSeconds(00);

      //fin.setTime(00);

      fin.setHours(00);
      fin.setMinutes(00);
      fin.setSeconds(00);

      if (init.toISOString().split("T")[0] === fin.toISOString().split("T")[0]) {
        console.log("dates are the same!")

      } else {
        var newInitDay = init.getDate() + 1;
        var newInitDate = new Date(initial.setDate(newInitDay));
        console.log("NEW INIT DATE: "+newInitDate);
        console.log("added");
        dates.push(newInitDate);
        checkDates(newInitDate, fin);

      }

    }

    checkDates(initial, final);

    return dates;

  },

  transposeShipments: function (data) {
    for (var i = 0; i < data.shipments.length; i++) {
      var shipment = data.shipments[i];
      //console.log(shipment);

      db.Shipment.create(shipment)
        .then(function (resp) {
          //console.log(`Successfully Added: \n${resp}`);
        })
        .catch(function (err) {
          console.log(err);
        })
    }
  },

  // transposeOrders: function (data) {
  //   for (var i = 0; i < data.orders.length; i++) {
  //     var order = data.orders[i];
  //     //console.log(shipment);

  //     db.Order.create(shipment)
  //       .then(function (resp) {
  //         console.log(`Successfully Added: \n${resp}`);
  //       })
  //       .catch(function (err) {
  //         console.log(err);
  //       })
  //   }
  // },

  updateShipments: function (dates) {

    //query the database for the most recent shipment
    db.Shipment.findOne().sort({ "shipDate": -1 }).exec(function (err, doc) {
      if (err) {
        console.log(err);
      }

      //console.log(doc);

      // var today = new Date().toISOString().split("T")[0];
      var today = new Date();
      var docDate = new Date(doc.shipDate);

      var pageSize = 100;

      var filter = {
        'shipDateStart': `${today}%2000:00:00`,
        'includeShipmentItems': true,
        'pageSize': pageSize
      }

      console.log("DOC DATE: " + docDate);

      console.log("TODAY DATE: " + today);

      var dates = updateDB.dateDiff(docDate, today);

      console.log(dates);


      // shipStationAPI.get('shipments', filter, function (data) {
      //   updateDB.transposeShipments(data);

      //   if (data.pages > 1) {

      //     for (var i = 2; i < data.pages + 1; i++) {

      //       filter.page = i;
      //       //console.log(filter);
      //       shipStationAPI.get('shipments', filter, function (data) {
      //         setTimeout(updateDB.transposeShipments, 2000, data);
      //       });

      //     }
      //   }

      // });
    })

  },

  // updateOrders: function (dates) {
  //   var today = new Date().toISOString().split("T")[0];
  //   var pageSize = 100;

  //   var filter = {
  //     'createDateStart': `${today}%2000:00:00`,
  //     'pageSize': pageSize
  //   }

  //   shipStationAPI.get('orders', filter, function (data) {
  //     updateDB.transposeOrders(data);

  //     if (data.pages > 1) {

  //       for (var i = 2; i < data.pages + 1; i++) {

  //         filter.page = i;
  //         //console.log(filter);
  //         shipStationAPI.get('orders', filter, function (data) {
  //           setTimeout(updateDB.transposeOrders, 2000, data);
  //         });

  //       }
  //     }

  //   });

  // },

  updateDatabase: function () {

    //updateDB.updateOrders();
    updateDB.updateShipments();

  },

  init: function (res) {

    updateDB.updateDatabase();

    res.render("index");

  }

}

module.exports = updateDB;