const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ShipmentSchema = new Schema({

    shipmentId: {
        type: String,
        required: true,
        unique: true
    },

    orderId: {
        type: String,
    },

    orderKey: {
        type: String,
    },

    userId: {
        type: String,
    },

    customerEmail: {
        type: String,
    },

    orderNumber: {
        type: String,
    },

    createDate: {
        type: Date,
    },

    shipDate: {
        type: Date,
    },

    shipmentCost: {
        type: mongoose.Decimal128,
    },

    insuranceCost: {
        type: mongoose.Decimal128,
    },

    trackingNumber: {
        type: String,
    },

    isReturnLabel: {
        type: Boolean,
    },

    batchNumber: {
        type: String,
    },

    carrierCode: {
        type: String,
    },

    serviceCode: {
        type: String,
    },

    packageCode: {
        type: String,
    },

    confirmation: {
        type: String,
    },

    warehouseId: {
        type: Number,
    },

    voided: {
        type: Boolean,
    },

    voidDate: {
        type: Date,
    },

    marketplaceNotified: {
        type: Boolean,
    },

    notifyErrorMessage: {
        type: String,
    },

    shipTo: {},

    weight: {},

    dimensions: {},

    insuranceOptions: {},

    advancedOptions: {},

    shipmentItems: {
        type: Array
    },

    labelData: {
        type: String
    },

    formData: {
        type: String
    }

});

const Shipment = mongoose.model("Shipment", ShipmentSchema);

module.exports = Shipment;