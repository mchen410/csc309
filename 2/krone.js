var cronJob = require('cron').CronJob;
var mysql = require("./nodedb");
var http = require('http');

exports.runhourly = function(){
    // todo. for testing update every second. change to hour before submit
    new cronJob('* * * * * *', function(){
        console.log("hail krone! " + new Date().toString());
        mysql.hourlyUpdate();
    }, null, true); // todo. install time module and specify timezone
}

// todo. loop through table posts and update note_count and other
// stuff, e.g. in tracks
function noteCount(){

}
