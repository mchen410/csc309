var _mysql = require('mysql');

var HOST = 'localhost';
var PORT = 3306;
var DATABASE = 'csc309h_g1malitm';
var MYSQL_USER = 'g1malitm';
var MYSQL_PASS = 'tahziehe';

var mysql = _mysql.createConnection({
    host: HOST,
    port: PORT,
	database: DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASS,
});

mysql.connect();
console.log("Now connected to " + HOST + ":" + DATABASE);

exports.getallblogs = function(){
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
}

var postCount = 0; //keep track of the number of tracked posts
exports.addBlog = function(req, res) {
    postCount++;
    console.log('inserting into users table .... ');
    mysql.query('INSERT INTO users(hostID, hostName) values ("' + postCount + '", "' + req.body.name + '")',
                function (err, results, fields) {
                if (err) throw err;
                else res.send('success: inserted blog to the table');
                console.log("blog name: " + req.body.name);
                });
}

// keeping a single connection open for server lifetime. good enough
// for assignment:
// todo opt. keep a connection pool
//
// mysql.end();

