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

mysql.end();
console.log("Connection ended.");