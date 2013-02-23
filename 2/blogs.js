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
    console.log('getting all blogs ...');
    mysql.query(
        'select * from blogs', function(err, result, fields) {
            if (err) throw err;
            else {
                console.log('selecting all blogs...........');
                for (var i in result) {
                    var blog = result[i];
                    console.log("blog name: " + blog.name);
                }
            }
        }
    );
    res.send("here's your gundam response!");
}

exports.getBlogTrends = function(req, res) {

}
