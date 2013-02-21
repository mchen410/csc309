var _mysql = require('mysql');

var HOST= 'dbsrv1.cdf.toronto.edu';
var PORT = 3306;
var MYSQL_USER = 'g1malitm';
var DATABASE = 'csc309h_g1malitm';
var PASSWRD = 'tahziehe';

var nodedb = _mysql.createConnection({
	host: HOST,
	port: PORT,
	user: MYSQL_USER,
	password: PASSWRD,
});

nodedb.connect(function(err) {
	console.log(err.code); // 'ECONNREFUSED'
	console.log(err.fatal); // true);
});
console.log('Connected to ' + HOST);

nodedb.end();
console.log('Connection terminated');
