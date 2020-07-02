var db = require("../models");

var shipments_ODM = {

    get: function(obj){
        db.find(obj);
    },

    getById: function(){}

};

module.exports = shipments_ODM;