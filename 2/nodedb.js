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
                for (var blog in result) {
                    console.log("blog name: " + blog.blogName);
                }
                return result;
            }
        }
    );
}

/*
 * Add a new blog to track in the database.
 */
exports.addBlog = function(bloghostname, req, res) {
    console.log('inserting into blogs table new blog: ' + bloghostname);
    console.log('INSERT INTO blogs(blogName) ' +
                'SELECT * FROM (SELECT ' + '\'' + bloghostname + '\') AS tmp' +
                ' WHERE NOT EXISTS (SELECT blogName FROM blogs WHERE blogName = '
                + '\'' + bloghostname + '\') LIMTI 1;');
    mysql.query('INSERT INTO blogs(blogName) ' +
                'SELECT * FROM (SELECT ' + '\'' + bloghostname + '\') AS tmp' +
                ' WHERE NOT EXISTS (SELECT blogName FROM blogs WHERE blogName = '
                + '\'' + bloghostname + '\');',
		function (err, results, fields) {
            if (err) {
				console.log(err);
				throw err;
			} else {
                console.log("inserted blog name: " + bloghostname);
				//response: successful
				
				res.writeHead(200, {
					'Content-Type': 'text/html'
				});
				res.end();
            }
		}
	);
}

exports.getPostsTracks = function(res, bloghostname, order, limit){
    console.log("INSIDE: getPostsTracks....");
    async.waterfall([
        // need this guy to pass bloghostname to getPosts:
        function dummyArgPasser(callback){
			callback(null, res, bloghostname, order, limit);
			},
        getPosts,
        insertTracks,
        ressend
    ]);
}

var DEFAULT_LIMIT = 55;

function getPosts(res, bloghostname, order, limit, callback){ // blogID, callback){
    var hardlimit = parseInt(limit) || DEFAULT_LIMIT;
    // todo. get min(hardlimit, DEFAULT_LIMIT);

    // defining querycallback in here because outside is out of scope
    function querycallback(err, posts, fields){
        console.log("INSIDE: getPosts.... posts: " + posts);
        if (err){
			console.log(err);
            callback(err);
        } else if (posts[0]) {
            callback(null, res, posts, order, limit); // passing along to res.send
        } else {
            callback(null, res, posts, order, limit);
        }
    }

    // todo. fill in queries

    if (bloghostname && order == "Trending"){
        mysql.query("SELECT p.postID, url, text, image, datePosted AS date, " +
					"lastTrack AS last_track, lastCount AS last_count " +
                    "FROM blogs b, likedPosts l, posts p " +
                    "WHERE b.blogID=l.blogID AND l.postID=p.postID AND b.blogName = ? " +
                    "ORDER BY lastCount DESC LIMIT ?;",
                    [bloghostname, hardlimit],
                    querycallback);
    } else if (bloghostname && order == "Recent"){
        mysql.query("SELECT p.postID, url, text, image, datePosted AS date, " +
					"lastTrack AS last_track, lastCount AS last_count " +
                    "FROM blogs b, likedPosts l, posts p " +
                    "WHERE b.blogID=l.blogID AND l.postID=p.postID AND b.blogName = ? " +
                    "ORDER BY lastTrack DESC LIMIT ?;",
                    [bloghostname, hardlimit],
                    querycallback);
    } else if (!bloghostname && order == "Trending"){
		var query = "SELECT p.postID, url, text, image, datePosted AS date, " +
			"lastTrack AS last_track, lastCount AS last_count " +
			'from posts p, tracks t ' +
			'where p.postID=t.postID and p.lastSeq=t.trackSeq ' +
			'order by t.trackIncr desc '+
			'limit ' + hardlimit;
		mysql.query(query, querycallback);
    } else if (!bloghostname && order == "Recent"){
		var query = "SELECT postID, url, text, image, datePosted AS date, " +
			"lastTrack AS last_track, lastCount AS last_count " +
			'from posts ' +
			'order by datePosted desc '+
			'limit ' + hardlimit;
		mysql.query(query, querycallback);
    } else {
        console.log("todo. more queries?");
    }
}

function insertTracks(res, posts, order, limit, callback){
	console.log('Inside insertTracks in nodedb.js');
    var i = 0; // todo. how do you keep track of the index in forEach?
    async.forEach(posts, function(post, callback){
        mysql.query("SELECT trackTime AS timestamp, trackSeq AS sequence, " +
					"trackIncr AS increment, noteCount AS count " +
                    "FROM tracks t " +
                    "WHERE t.postID=? " +
					"ORDER BY trackSeq desc;",
                    [post.postID],
                    function(err, tracks, fields){
                        if (err){
                            callback(err);
                        } else if (tracks[0]){
                            delete post.postID; // don't need to res.send postID
                            posts[i].tracking = tracks;
                            i++;
                            callback();
                        } else {
                            callback();
                        }
                    });
    }, function(err){
        if (err) throw err;
        callback(null, res, posts, order, limit);
    });
}

function ressend(res, posts, order, limit, callback){
    var result = {};
    result.order = order;
    if (limit){
        result.limit = limit;
    }
    result.trending = posts;
    console.log(JSON.stringify(result, 0, 2));
	console.log('About to send response in nodedb.js');
    res.send(JSON.stringify(result));
    callback();
}

exports.addAndUpdatePosts = function(output){
	var likedPosts = output.liked_posts;
	var count = output.liked_count;
	
	for (var post in likedPosts){
		//if already in posts
			//update lastSeq, lastIncr, lastCount, lastTrack
			//add to likedPost if blog-post pair is not there
		//if not in posts
			//add new entry
			//add to likedPost 
	};
}

exports.getBlogRecent = function(res, bloghostname, order, limit){
    console.log("getBlogRecent...");
    async.waterfall([
                     // need this guy to pass bloghostname to getPosts:
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

