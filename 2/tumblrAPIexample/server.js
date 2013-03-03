var express = require('express');
var mod = require('./gettumblr');
var app = express();
app.use(express.bodyParser());

app.post('/blog', function(request, response){
	try {
		var blog = request.body.blog;
		mod.getBlogInfo(blog, 'likes')
	} catch(err) {
		response.send("Error!");
	}
	response.send("Boop, it works");
});

app.get('/blog/:hostname/trends', function(request, response){
	response.send(request.params.hostname);
});

app.get('/blog/trends', function(request, response){
	response.send('blog trends');
});

app.listen(30975);
console.log('Listening on port 30975');

