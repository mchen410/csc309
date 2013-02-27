var mysql = require("./nodedb");

// front page:
exports.frontDesk = function(req, res){
    // res.send("hello NEO, the ORACLE has been expecting you....");
    res.render("index.html");
}

// todo. parse incoming urls and call more methods
// todo. parse incoming urls and call more methods
// todo. parse incoming urls and call more methods

exports.addBlog = function(req, res) {

}

// testing routing and db connection:
// todo. replace with real functility
exports.getAllTrends = function(req, res) {
    mysql.getallblogs(); // example call to method exported from ./nodedb.js
    res.send("here's your gundam response!");
}

exports.getBlogTrends = function(req, res) {

}
