var async = require("async");
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

// todo. validate request data

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

// todo. remove blogCount: don't need it. if you omit blogID on
// INSERT, AUTO_INCREMENT will update blogID for you

/*
 * Add a new blog to track in the database.
 */
exports.addBlog = function(bloghostname) {
    console.log('inserting into blogs table .... ');
    mysql.query('INSERT INTO blogs(blogName) values ("' + bloghostname + '")',
                function (err, results, fields) {
                    if (err) throw err;
                    else res.send('success: inserted blog to the table');
                    console.log("blog name: " + req.body.name);
                });
}

exports.getBlogTrendingNolimit = function(res, bloghostname, order){
    console.log("getBlogTrendingNolimit...");
    async.waterfall([
        // need this guy to pass bloghostname to getAllPostsLikedByABlog:
        function dummyArgPasser(callback){callback(null, res, bloghostname, order);},
        getAllPostsLikedByABlog,
        insertTracks
    ]);
}

exports.getBlogTrendingWithLimit = function(res, bloghostname, order, limit) {
    console.log("getBlogTrendingWithLimit...");
    async.waterfall([
        // need this guy to pass bloghostname to getAllPostsLikedByABlog:
        function dummyArgPasser(callback){callback(null, res, bloghostname, order, limit);},
        getAllPostsLikedByABlogWithLimit,
        insertTracks
    ]);
}

function getAllPostsLikedByABlog(res, bloghostname, order, callback){ // blogID, callback){
    mysql.query("select p.postID, url, text, image, date, last_track, last_count " +
                "from blogs b, likedPosts l, posts p " +
                "where b.blogName=? and b.blogID=l.blogID and l.postID=p.postID " +
                "order by last_count desc;",
                [bloghostname],
                function(err, posts, fields){
                    if (err){
                        callback(err);
                    } else if (posts[0]) {
                        callback(null, res, posts, order);
                    } else {
                        callback(null, res, posts, order);
                    }
                });
}

function getAllPostsLikedByABlogWithLimit(res, bloghostname, order, limit, callback){ // blogID, callback){
    var limit_int = parseInt(limit); // convert limit to int
    console.log("print the limit" + limit_int);
    mysql.query("select p.postID, url, text, image, date, last_track, last_count " +
                "from blogs b, likedPosts l, posts p " +
                "where b.blogName=? and b.blogID=l.blogID and l.postID=p.postID " +
                "order by last_count desc LIMIT ?;",
                [bloghostname, limit_int],
                function(err, posts, fields){
                if (err){
                        callback(err);
                    } else if (posts[0]) {
                        callback(null, res, posts, order);
                    } else {
                        callback(null, res, posts, order);
                    }
                });
}


exports.getBlogRecentNoLimit = function(res, bloghostname, order){
    console.log("getBlogRecentNolimit...");
    async.waterfall([
                     // need this guy to pass bloghostname to getAllPostsLikedByABlog:
                     function dummyArgPasser(callback){callback(null, res, bloghostname, order);},
                     getAllRecentPostsLikedByABlog,
                     insertTracks
                     ]);
}

function getAllRecentPostsLikedByABlog(res, bloghostname, order, callback){ // blogID, callback){
    mysql.query("select p.postID, url, text, image, date, last_track, last_count " +
                "from blogs b, likedPosts l, posts p " +
                "where b.blogName=? and b.blogID=l.blogID and l.postID=p.postID " +
                "order by last_track desc;", 
                [bloghostname],
                function(err, posts, fields){
                if (err){
                    callback(err);
                } else if (posts[0]) {
                    callback(null, res, posts, order);
                } else {
                    callback(null, res, posts, order);
                }
            });
}


function insertTracks(res, posts, order, callback){
    var i = 0; // todo. how do you keep track of the index in forEach?
    async.forEach(posts, function(post, callback){
        mysql.query("select timestamp, sequence, increment, count " +
                    "from tracks t " +
                    "where t.postID=?;",
                    [post.postID],
                    function(err, tracks, fields){
                        if (err){
                            callback(err);
                        } else if (tracks[0]){
                            delete post.postID; // don't need this anymore
                            posts[i].tracking = tracks;
                            i++;
                            callback();
                        } else {
                            callback();
                        }
                    });
    }, function(err){
        if (err) throw err;
        var result = {};
        result.order = order;
        result.limit = "todo";  // todo. add default limit, say 55
        result.trending = posts;
        console.log(JSON.stringify(result, 0, 2));
        res.send(JSON.stringify(result));
    });
}

/*
 * Return the ID in table blogs of the blog with name blogName.
 * (This is the primary key we use in our database.)
 */
exports.getBlogID = function(blogName){
	var query = 'SELECT blogID FROM blogs WHERE blogName="' + blogName + '";'
	mysql.query(query, function (err, results, fields){
		if (err){
			throw err;
		} else if (results[0]){
			var blogID = results[0].blogID;
		} else {
            console.log(blogName + " is not the blog you're looking for");
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

exports.getAllTrending = function(res, limit) {
	async.waterfall([
        	function dummyArgPasser(callback){callback(null, res, limit);},
        	getAllTrendingPosts,
		insertTracks
	]);
}


exports.getAllRecent = function(limit) {
	async.waterfall([
        	function dummyArgPasser(callback){callback(null, res, limit);},
        	getAllRecentPosts,
		insertTracks
	]);
}

exports.getAllTrendingPosts = function(res, limit) {
	var query = 'select p.postID, p.URL, p.postText, p.image, p.postDate, p.lastTrack, p.lastCount ' +
			'from posts p, tracks t ' +
			'where p.postID=t.trackID and p.lastSeq=t.difference ' +
			'order by t.difference desc '+
			'limit ' + limit;
	mysql.query(query, function (err, posts, fields){
		if (err){
			callback(err);
		} else if (posts[0]) {
			callback(null, res, posts);
                } else {
                       	callback(null, res, posts);
		}
	});
};

exports.getAllRecentPosts = function(res, limit) {
	var query = 'select postID, URL, postText, image, postDate, lastTrack, lastCount ' +
			'from posts' +
			'order by postDate desc '+
			'limit ' + limit;
	mysql.query(query, function (err, posts, fields){
		if (err){
			callback(err);
		} else if (posts[0]) {
			callback(null, res, posts);
                } else {
                       	callback(null, res, posts);
		}
	});
};

// keeping a single connection open for server lifetime. good enough
// for assignment:
//
// todo opt. keep a connection pool
//
// mysql.end();

