var cronJob = require('cron').CronJob;
var mysql = require("./nodedb");
var http = require('http');

var tumblrGet = {
	host: 'api.tumblr.com',
	path: '/v2/blog/',
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	}
};

var apiKey = 'SR4t4ORhyC4rGwrs9uNIweXS6nE7nGtOLMuZLacKUoSlJIDKuC';

exports.runhourly = function(){
    // todo. for testing update every minute. change to hour before submit
    new cronJob('0 1 * * * *', function(){
        // console.log("hail krone! " + new Date().toString());
        noteCount();
    }, function callback(){}, true); // todo. install time module and specify timezone
}

// todo. loop through table posts and update note_count and other
// stuff, e.g. in tracks
function noteCount(){

}

function queryAllBlogs() {

	//get a list of all blogs
	var blogList = mysql.getallblogs();

	//for every blog in blogList, do tumblr query
	for (var blog in blogList){
		retrieveLikes(blog.blogName, 'likes');
	};
}

function retrieveLikes(blog, retrieve){
	console.log('Getting from http://api.tumblr.com/v2/blog/' + blog + '/' + retrieve)

	//Copy tumblrGet
	var options = {};
	for( var key in tumblrGet)
    	options[key] = tumblrGet[key];

	//Append blog id to the options variable and add the API key
	options['path'] += blog + '/' + retrieve + '?api_key=' + apiKey;
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
