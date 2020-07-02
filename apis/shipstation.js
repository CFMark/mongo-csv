var request = require('request');

/*
    This script is a general purpose authenticated API Call to Shipstation.
    Implementation of this script generally works as follows:

    Declare an import variable:
    var shipStationAPI = require('../apis/shipstation');

    Declare query parameters as an object; the script will construct a proper
    query string from this object.

    var reqParams = {
    'shipDateStart': `${today}%2000:00:00`,
    'includeShipmentItems': true,
    }

    Invoke your method of choice declaring the endpoint as a string
    and passing the query object before adding any call specific logic
    to the method.

    shipStationAPI.get('shipments', reqParams, function (data) {
        RETRIEVE DATA
        PROCESS DATA
    })

*/

var shipStationAPI = {
    //this property contains a valid auth string for access shipstation's API
    authString: `Basic ${Buffer.from(`${process.env.SSAPIKey}:${process.env.SSAPISecret}`).toString('base64')}`,
    //the get method retrieve order data from the shipstation API
    get: function (endpoint, params, cb) {

        var hosturl = `https://ssapi.shipstation.com/${endpoint}?`;
        var keys = Object.keys(params);
        var url = hosturl;

        for (var i = 0; i < keys.length; i++) {
            var newParam;
            if (i === 0) {
                newParam = `${keys[i]}=${params[keys[i]]}`;
            } else {
                newParam = `&${keys[i]}=${params[keys[i]]}`;
            }
            url += newParam;
        }

        console.log(url);

        var options = {
            url: url,
            headers: {
                Authorization: shipStationAPI.authString
            }
        };
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                cb(data);
            }
        }
        request(options, callback);
    },

}

module.exports = shipStationAPI;