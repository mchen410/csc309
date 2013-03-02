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

exports.getBlogTrending = function(res, bloghostname, order, limit){
    console.log("INSIDE: getBlogTrending...");
    async.waterfall([
        // need this guy to pass bloghostname to getAllPostsLikedByABlog:
        function dummyArgPasser(callback){callback(null, res, bloghostname, order, limit);},
        getAllPostsLikedByABlog,
        insertTracks
    ]);
}

function getAllPostsLikedByABlog(res, bloghostname, order, limit, callback){ // blogID, callback){
    limit = parseInt(limit);
    mysql.query("select p.postID, url, text, image, date, last_track, last_count " +
                "from blogs b, likedPosts l, posts p " +
                "where b.blogID=l.blogID and l.postID=p.postID and b.blogName = ? " +
                "order by last_count desc LIMIT ?; ",
                [bloghostname, limit],
                function(err, posts, fields){
                console.log("INSIDE: getAllPostsLikedByABlog.... posts: " + posts);
                    if (err){
                        callback(err);
                    } else if (posts[0]) {
                        callback(null, res, posts, order, limit); //include default limit here so insertTracks will know
                    } else {
                        callback(null, res, posts, order, limit); //here too
                    }
                });
}

exports.getBlogRecent = function(res, bloghostname, order, limit){
    console.log("getBlogRecent...");
    async.waterfall([
                     // need this guy to pass bloghostname to getAllPostsLikedByABlog:
                     function dummyArgPasser(callback){callback(null, res, bloghostname, order, limit);},
                     getAllRecentPostsLikedByABlog,
                     insertTracks
                     ]);
}

function getAllRecentPostsLikedByABlog(res, bloghostname, order, limit, callback){ // blogID, callback){
    limit = parseInt(limit);
    mysql.query("select p.postID, url, text, image, date, last_track, last_count " +
                "from blogs b, likedPosts l, posts p " +
                "where b.blogName=? and b.blogID=l.blogID and l.postID=p.postID " +
                "order by last_track desc LIMIT ?;",
                [bloghostname, limit],
                function(err, posts, fields){
                if (err){
                    callback(err);
                } else if (posts[0]) {
                    callback(null, res, posts, order, limit);
                } else {
                    callback(null, res, posts, order, limit);
                }
            });
}


function insertTracks(res, posts, order, limit, callback){
	console.log('Inside insertTracks in nodedb.js');
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
        result.limit = limit;  // todo. add default limit, say 55
        result.trending = posts;
        // console.log(JSON.stringify(result, 0, 2));
		console.log('About to send response in nodedb.js');
        res.send(JSON.stringify(result));
    });
}

exports.getAllTrending = function(res, limit) {
	console.log('Inside getAllTrending in nodedb.js');
	async.waterfall([
        function dummyArgPasser(callback){
			callback(null, res, limit);
		},
        getAllTrendingPosts,
		insertTracks
	]);
}


exports.getAllRecent = function(res, limit) {
	console.log('Inside getAllRecent in nodedb.js');
	async.waterfall([
        function dummyArgPasser(callback){
			callback(null, res, limit);
		},
        getAllRecentPosts,
		insertTracks
	]);
}

function getAllTrendingPosts(res, limit, callback) {
	console.log('Inside getAllTrendingPosts in nodedb.js');
	var query = 'select p.postID, p.url, p.text, p.image, p.date, p.last_track, p.last_count ' +
			'from posts p, tracks t ' +
			'where p.postID=t.postID and p.lastSeq=t.increment ' +
			'order by t.increment desc '+
			'limit ' + limit;
	mysql.query(query, function (err, posts, fields){
		if (err){
			console.log('Inside err.');
			console.log(err);
			callback(err);
		} else if (posts[0]) {
			console.log('Inside else if.');
			callback(null, res, posts, limit, 'Trending');
        } else {
			console.log('Inside else.');
			callback(null, res, posts, limit, 'Trending');
		}
	});
};

function getAllRecentPosts(res, limit, callback) {
	console.log('Inside getAllRecentPosts in nodedb.js');
	var query = 'select postID, URL, text, image, date, last_track, last_count ' +
			'from posts ' +
			'order by date desc '+
			'limit ' + limit;
	console.log(query);
	console.log('Inside getAllRecentPosts about to execute query.');
	mysql.query(query, function (err, posts, fields){
		console.log('Inside after query function');
		if (err){
			console.log('Inside err.');
			console.log(err);
			callback(err);
		} else if (posts[0]) {
			console.log('Inside else if.');
			callback(null, res, posts, limit, 'Recent');
        } else {
			console.log('Inside else.');
            callback(null, res, posts, limit, 'Recent');
		}
	});
};

// keeping a single connection open for server lifetime. good enough
// for assignment:
//
// todo opt. keep a connection pool
//
// mysql.end();

