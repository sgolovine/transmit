/**
 * Created by sgolovine on 11/15/16.
 */


var staticTimestamp = require('../lib/timestamp/staticTimestamp');
var credentialStore = require('../lib/store/credentialStore');
var dbutils = require('../lib/dbutils');


var Timestamp = function(){};

Timestamp.prototype.setTimestamp = function(callback) {
    // var tid = 0;

    var dbtools = new dbutils(new credentialStore());
    var staticTimestampInstance = new staticTimestamp();
    var timestamp = staticTimestampInstance.getTimestamp24();
    var hour = staticTimestampInstance.getHour24();
    var minute = staticTimestampInstance.getMinute();
    var second = staticTimestampInstance.getSecond();
    var month = staticTimestampInstance.getMonth();
    var day = staticTimestampInstance.getDay();
    var year = staticTimestampInstance.getYear();
    var expiration = staticTimestampInstance.getExpiration();
    dbtools.autoinsert('timestamp', 'timestamp', timestamp, function(id){
        dbtools.update('timestamp', id, 'hour', hour);
        dbtools.update('timestamp', id, 'minute', minute); // minute
        dbtools.update('timestamp', id, 'second', second); // second
        dbtools.update('timestamp', id, 'month', month); // month
        dbtools.update('timestamp', id, 'day', day); // day
        dbtools.update('timestamp', id, 'year', year);
        dbtools.insert('expiration_date', id, 'expiration_date', expiration);
        callback(id);
    });

};
module.exports = Timestamp;