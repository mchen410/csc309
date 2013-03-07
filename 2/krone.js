var cronJob = require('cron').CronJob;
var mysql = require("./nodedb");
var http = require('http');

exports.runhourly = function(){
    // todo. for testing update every minute. change to hour before submit
    new cronJob('*/5 * * * * *', function(){
        console.log("hail krone! " + new Date().toString());
        mysql.hourlyUpdate();
    }, null, true); // todo. install time module and specify timezone
}
