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

/*Ignore this, since we'll be doing it in tumblrapi.js*/
function retrieveLikes(blog){
	console.log('Getting from http://api.tumblr.com/v2/blog/' + blog + '/' + retrieve)

	//Copy tumblrGet
	var options = {};
	for( var key in tumblrGet)
    	options[key] = tumblrGet[key];

	//Append blog id to the options variable and add the API key
	options['path'] += blog + '/likes?api_key=' + apiKey;
	console.log(options);

	var output = '';

	//Make GET request to Tumblr
	var request = http.request(options, function(response) {
		response.setEncoding('utf8');

		response.on('data', function(chunk) {
			output += chunk;
		});

		response.on('end', function() {
			var obj = JSON.parse(output);
			console.log(obj);

			mysql.addAndUpdatePosts(output);
		});
	});

	request.end();
};
