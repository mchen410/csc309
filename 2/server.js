var express = require('express');
var helper = require('helper.js');
var server = express.createServer(express.logger());

server.post('/blog', helper.addBlog);
server.get('/blog/:baseHostname/trends', helper.getBlogTrends);
server.get('/blogs/trends', helper.getAllTrends);

app.use(express.static(__dirname));
var port = 30975;
app.listen(port, function() {
  console.log("Listening on port: " + port);
});
