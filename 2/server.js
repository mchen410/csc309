var express = require('express');
var blogs = require('./blogs');
var server = express();

var jade = require("jade");
server.engine(".html", jade.renderFile);
// server.use("/static", express.static(__dirname + "/static"));
server.use(express.static(__dirname + "/static"));

server.use(express.logger("dev"));

server.get("/", blogs.frontDesk);
server.get('/blog/:baseHostname/trends', blogs.getBlogTrends);
server.get('/blogs/trends', blogs.getAllTrends);
server.post('/blog', blogs.addBlog);

var port = 30975;
server.listen(port, function() {
    console.log("Listening on port: " + port);
});
