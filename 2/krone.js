var cronJob = require('cron').CronJob;

exports.runhourly = function(){
    // todo. for testing update every minute. change to hour before submit
    new cronJob('0 */1 * * * *', function(){
        console.log("hail krone! " + new Date().toString());
    }, function callback(){}, true); // todo. install time module and specify timezone
}
