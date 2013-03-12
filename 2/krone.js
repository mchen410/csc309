var cronJob = require('cron').CronJob;
var mysql = require("./nodedb");
var http = require('http');

/*  For every blog being tracked, retrieve a list of all posts liked by the tumblr user inorder to track the changes to the popularity of the post tracked.
    Repeat this task every hour. 
 */
exports.runhourly = function(){
    new cronJob('29 29 */1 * * *', function(){
        mysql.hourlyUpdate();
    }, null, true); 
}
