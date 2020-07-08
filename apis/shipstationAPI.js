/**
 * ShipStation API Controller JS
 *   
 *   Last Updated: July 2, 2020
 * 
 *   This file is a collection of JavaScript Methods that can be used 
 *   to read and make use of data with the shipStationAPI.
 * 
 *   __SET UP__
 * 
 *   IMPORT EXAMPLE:
 *   
 *       var shipStationAPI = require("../route/to/shipstationAPI");
 * 
 *       const shipStationAPI = require("../route/to/shipstationAPI");
 *   
 */

//this file relies on the request module to make http calls
//NOTE: as of February 2020 request has been deprecated
var request = require('request');

var shipStationAPI = {

    /**
     * 
     *   AUTHENTICATION SETUP
     * 
     *   In order to successfully execute any of the methods in this file
     *   one must first obtain an API Key and API Secret from ShipStation.
     *   This can be done by creating an account with ShipStation.
     *   
     *   Once you have your Key and Secret create two environment
     *   variables:
     * 
     *   SSAPIKey='yourShipStationAPIKey'
     *   SSAPISecret='yourShipStationSecret'
     * 
     *   NOTE: NEVER ADD YOUR API KEY OR SECRET DIRECTLY TO THIS SCRIPT
     *   SECURITY BEST PRACTICES REQUIRE THAT YOU USE ENVIRONMENT VARIABLES
     * 
     *   The authString property formats an authString as specified in the 
     *   ShipStation documentation: 
     * 
     *   https://www.shipstation.com/docs/api/requirements/
     * 
     */
    
    authString: `Basic ${Buffer.from(`${process.env.SSAPIKey}:${process.env.SSAPISecret}`).toString('base64')}`,
    
    /**
     *   GET METHOD
     * 
     *   The get method gets data from the shipStationAPI and makes it
     *   available for use in a callback function which can be provided
     *   as an argument.
     * 
     *   @param {string} endpoint - the endpoint argument is the endpoint
     *   of the shipstation API that you wish to retrieve data from. 
     *   (ex: 'orders', 'shipments', 'products', etc)
     *   
     *   @param {object} filter - the filter argument is a set of one or
     *   more filters formatted as an object; where the filter name is
     *   the object property and the property value is the filter value.
     *   (ex: var filterObject = {orderID: 123, storedId: 123} )
     * 
     *   @param {function} cb - the cb argument is a callback function
     *   that takes the data returned from the ShipStation API as a
     *   parsed JSON object.
     *   (ex: var callback = function(data){ console.log(data) } )
     * 
     */
    
    get: function (endpoint, filter, cb) {
        
        //base url for the shipstation API
        var url = `https://ssapi.shipstation.com/${endpoint}?`;

        //create an array of the filter object keys
        var keys = Object.keys(filter);

        //loop through the keys
        for (var i = 0; i < keys.length; i++) {

            //create a placeholder variable to hold the current filter
            var newParam;

            //if this is the first key in the array
            if (i === 0) {

                //add the parameter with the following format
                newParam = `${keys[i]}=${filter[keys[i]]}`;

            //if this is NOT the first key in the array    
            } else {
                
                //add the parameter with the following format
                newParam = `&${keys[i]}=${filter[keys[i]]}`;

            }

            //append the formatted paramter to the url query string
            url += newParam;

        }
        
        //console.log(url);

        //the options object for request module http call
        var options = {
            url: url,
            headers: {
                Authorization: shipStationAPI.authString
            }
        };

        //callback function for the request module http call
        function callback(error, response, body) {

            if (!error && response.statusCode == 200) {

                //if there is no error and the status code is 200
                //parse the body of the response into a JSON object
                var data = JSON.parse(body);

                //pass the parsed data to the shipStationAPI cb function
                cb(data);
            }
        }
        
        //invoke the request module http call
        request(options, callback);
    },

}

module.exports = shipStationAPI;