/**
 * Created by Vincent kouassi on 4/28/2015.
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DeviceOperationSchema   = new Schema({
    deviceId: String,
    operation: String
});

module.exports = mongoose.model('DeviceOperation', DeviceOperationSchema);