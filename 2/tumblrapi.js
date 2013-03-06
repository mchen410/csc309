var http = require('http');
var mysql = require('./nodedb');

var tumblrGet = {
	host: 'api.tumblr.com',
	path: '/v2/blog/',
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	}
};

var apiKey = 'SR4t4ORhyC4rGwrs9uNIweXS6nE7nGtOLMuZLacKUoSlJIDKuC';

exports.retrieveLikes = function(blog){
	console.log('Getting from http://api.tumblr.com/v2/blog/' + blog + '/' + 'likes')

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
			mysql.handlePosts(output);
		});
	});

	request.end();
};
