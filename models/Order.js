const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({

    orderId: {
        type: String,
        required: true,
        unique: true
    },

    orderNumber: {
        type: String
    },

    orderKey: {
        type: String
    },

    orderDate: {
        type: Date
    },

    createDate: {
        type: Date
    },

    modifyDate: {
        type: Date
    },

    paymentDate: {
        type: Date
    },

    shipByDate: {
        type: Date
    },

    orderStatus: {
        type: String
    },

    customerId: {
        type: String
    },

    customerUsername: {
        type: String
    },

    customerEmail: {
        type: String
    },

    billTo: {},

    shipTo: {},

    items: {
        type: Array
    },

    orderTotal: {
        type: mongoose.Decimal128
    },

    amountPaid: {
        type: mongoose.Decimal128
    },

    taxAmount: {
        type: mongoose.Decimal128
    },

    shippingAmount: {
        type: mongoose.Decimal128
    },

    customerNotes: {
        type: String
    },

    internalNotes: {
        type: String
    },

    gift: {
        type: Boolean
    },

    giftMessage: {
        type: String
    },

    paymentMethod: {
        type: String
    },

    requestedShippingService: {
        type: String
    },

    carrierCode: {
        type: String
    },

    serviceCode: {
        type: String
    },

    packageCode: {
        type: String
    },

    confirmation: {
        type: String
    },

    shipDate: {
        type: Date
    },

    holdUntilDate: {
        type: Date
    },

    weight: {},

    dimensions: {},

    insuranceOptions: {},

    internationalOptions: {},

    advancedOptions: {},

    tagIds: Array,

    userId: {
        type: String
    },

    externallyFulfilled: {
        type: Boolean
    },

    externallyFulfilledBy: {
        type: String
    },

    labelMessages: {
        type: String
    }

});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;