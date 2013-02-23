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

module.exports = mysql; // do a require("nodedb.js") in the model (e.g. blogs.js)

// keeping a single connection open for server lifetime. good enough
// for assignment:
// todo opt. keep a connection pool
//
// mysql.end();