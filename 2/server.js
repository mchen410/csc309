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

// allow cross origin scripting
server.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

server.get("/", blogs.frontDesk);
server.get('/blog/:baseHostname/trends', blogs.getPostsTracks);
server.get('/blogs/trends', blogs.getPostsTracks);
server.post('/blog', blogs.addBlog);

var port = 30975;
server.listen(port, function() {
    console.log("Listening on port: " + port);
});

krone.runhourly();
