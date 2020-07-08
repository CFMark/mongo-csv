var db = require("../models");
var shipStationAPI = require("../apis/shipstationAPI");
var updateDB = {

  formatDateISO: function (date) {

    var fromattedDate = date.toISOString().split("T")[0];

    return fromattedDate
  },

  dateDifference: function (earlyDate, lateDate){
    
    var early = new Date("2020-08-01");
    var late = new Date("2020-07-02");
    var days = late - early;
    console.log(early);
    
    console.log(early.getDate());
    //console.log(late);
    //console.log(late.getDate());
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

    db.Shipment.findOne().sort({ "shipDate": -1 }).exec(function (err, doc) {
      if (err) {
        console.log(err);
      }
      //console.log(doc);

      var today = new Date().toISOString().split("T")[0];
      var docDate = doc.shipDate;
      var early = new Date("2020-07-01");
      var late = new Date("2020-07-08");
      var pageSize = 100;

      var filter = {
        'shipDateStart': `${today}%2000:00:00`,
        'includeShipmentItems': true,
        'pageSize': pageSize
      }



      console.log(updateDB.dateDifference(early,late));

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