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
console.log("Now connected to " + DATABASE + " at " + HOST + ":" + PORT);

/*
 * Return all blogs from the blogs table.
 */
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

var blogCount = 0; //keep track of the number of tracked posts

/*
 * Add a new blog to track in the database.
 */
exports.addBlog = function(req, res) {
    blogCount++;
    console.log('inserting into blogs table .... ');
    mysql.query('INSERT INTO blogs(blogID, blogName) values ("' + blogCount + '", "' + req.body.blog + '")',
        function (err, results, fields) {
            if (err) throw err;
            else res.send('success: inserted blog to the table');
                console.log("blog name: " + req.body.name);
            });
}

/*
 * Return the ID in table blogs of the blog with name blogName.
 * (This is the primary key we use in our database.)
 */
exports.getBlogID = function(blogName, blogID){
	var query = 'SELECT blogID FROM blogs WHERE blogName="' + blogName + '";'
	mysql.query(query, function (err, results, fields){
		if (err){
			throw err;
		} else {
			blogID = results[0].blogID;
		}
	});
}

/*
 * Add a new post to the likedPost table, given
 * a blogID, and a post object from the Tumblr API response
 * to /{base-hostname}/likes
 */
exports.addLikedPost = function(blogID, postObj) {
	var postID = postObj.id;
	var query = 'INSERT INTO likedPosts(blogID, postID) values ("' + blogID + '", "' + postID + '")';
	mysql.query(query, function (err, results, fields) {
		if (err) {
			throw err;
		}
		else {
			console.log("blog " + blogID + " likes post " + postID);
		}
	});
}

// keeping a single connection open for server lifetime. good enough
// for assignment:
//
// todo opt. keep a connection pool
//
// mysql.end();

