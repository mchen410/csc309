var express = require('express');
var params = require('express-params');
var blogs = require('./blogs');
var krone = require('./krone');

var server = express();

var jade = require("jade");
server.engine(".html", jade.renderFile);
server.use("/static", express.static(__dirname + "/static"));
server.use(express.static(__dirname + "/static"));

server.use(express.logger("dev"));
server.use(express.bodyParser());

server.get("/", blogs.frontDesk);
server.get('/blog/:baseHostname/trends', blogs.getPostsTracks);
server.get('/blogs/trends', blogs.getPostsTracks);
server.post('/blog', blogs.addBlog);

var port = 31390;
server.listen(port, function() {
    console.log("Listening on port: " + port);
});

krone.runhourly();
