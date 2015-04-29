/**
 * Created by Vincent kouassi on 4/28/2015.
 */

var express    = require('express');       
var app        = express();                 
var bodyParser = require('body-parser');

var DeviceOperation     = require('./app/models/DeviceOperation');
var operation = {deviceId:"", operation:""};
var operations = [];

function start_express_routing() {

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	var port = process.env.PORT || 8080;        

	// API ROUTES
	var router = express.Router();     

	middlewareForAllRequestWithRouter(router);  

	managePostGetDeviceOperationsWithRouter(router);   

	manageGetDeviceOperationsOfDeviceIdWithRouter(router);    

	// Basic test GET http://localhost:8080/api)
	router.get('/', function(req, res) {
	    res.json({ message: 'welcome to our api!' });   
	});

	app.use('/api', router);

	app.listen(port);

	console.log("express server_ws with routes started");
}

function middlewareForAllRequestWithRouter(router) {
	router.use(function(req, res, next) {
    	console.log('Processing request...');
    	next(); 
	});
}

function managePostGetDeviceOperationsWithRouter(router) {
	router.route('/operations')

    .post(function(req, res) {
        
        var deviceOperation = new DeviceOperation();      
        deviceOperation.deviceId = req.body.deviceId;  
        deviceOperation.operation = req.body.operation; 

        operations.push(deviceOperation);

        res.json({result:operations.length.toString()})        
    })

    .get(function(req, res) {

    	res.json(operations);

    });;
}

function manageGetDeviceOperationsOfDeviceIdWithRouter(router) {
	router.route('/operations/:device_id')

    .get(function(req, res) {

    	var deviceOperationsForDeviceId = operations.filter(deviceOperationDeviceIdFilter(req.params.device_id));

    	res.json(deviceOperationsForDeviceId);

    })

    .delete(function(req, res) {

        operations = operations.filter(deviceOperationWithoutDeviceIdFilter(req.params.device_id));

        res.json({ result: 'Successfully deleted' });

    });

}

function deviceOperationDeviceIdFilter(deviceId) {
    return function(deviceOperation) {
        return deviceOperation.deviceId == deviceId;
    };
}

function deviceOperationWithoutDeviceIdFilter(deviceId) {
    return function(deviceOperation) {
        return deviceOperation.deviceId != deviceId;
    };
}


exports.start_express_routing = start_express_routing;
