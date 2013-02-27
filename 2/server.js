var express = require('express');
var params = require('express-params');
var blogs = require('./blogs');
var server = express();

server.use(express.logger("dev"));
// server.use(express.static(__dirname));

server.get('/', blogs.frontDesk);

server.get('/blog/:baseHostname/trends', blogs.getBlogTrends);
server.get('/blogs/trends', blogs.getAllTrends);

server.post('/:blog', blogs.addBlog);

var port = 30975;
server.listen(port, function() {
    console.log("Listening on port: " + port);
});
