var mysql = require("./nodedb");

// main page:
exports.frontDesk = function(req, res){
    res.send("hello NEO, the ORACLE has been expecting you....");
}

// todo. parse incoming urls and call more methods
// todo. parse incoming urls and call more methods
// todo. parse incoming urls and call more methods

exports.addBlog = function(req, res) {

}

// testing routing and db connection:
// todo. replace with real functility
exports.getAllTrends = function(req, res) {
    mysql.getallblogs();
    res.send("here's your gundam response!");
}

exports.getBlogTrends = function(req, res) {

}
