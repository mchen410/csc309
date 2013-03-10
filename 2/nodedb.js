var async = require("async");
var _mysql = require('mysql');
var tumblr = require('./tumblrapi');

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
exports.hourlyUpdate = function(){
    console.log('getting all blogs ...');
    mysql.query(
        'select * from blogs', function(err, result, fields) {
            if (err){
				console.log(err);
				// throw err;
			} else {
                console.log('selecting all blogs...........');
                async.forEach(result, function(blog, callback){
					console.log('blog: ' + blog.blogName);
					tumblr.retrieveLikes(blog.blogName, blog.blogID);
				});
            }
        }
    );
}

/*
 * Add a new blog to track in the database.
 * params: 	bloghostname - the name of new blog
			req - the request object from server
			res	- the response object to client
 */
exports.addBlog = function(bloghostname, req, res) {
    console.log('inserting into blogs table new blog: ' + bloghostname);
       mysql.query('INSERT INTO blogs(blogName) ' +
                'SELECT * FROM (SELECT ' + '\'' + bloghostname + '\') AS tmp' +
                ' WHERE NOT EXISTS (SELECT blogName FROM blogs WHERE blogName = '
                + '\'' + bloghostname + '\');',
		function (err, results, fields) {
            if (err) {
				console.log(err);
				// throw err;
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

/* Handles the get request by querying the database for appropriate posts,
 * then setting up the JSON response.
 * params: 	res - the response object to client
			bloghostname - the name of the blog
			order - Trending or Recent
			limit - # of posts to return */
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

/* Query the database for the posts that correspond to the GET call.
 * params:	res - response object to client
			bloghostname - name of blog
			order - Trending / Recent
			limit - # of posts to return
			callback - next function to call */
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

    if (bloghostname && order == "Trending"){
        mysql.query("SELECT p.postID, url, text, image, datePosted AS date, " +
					"lastTrack AS last_track, lastCount AS last_count " +
                    "FROM blogs b, likedPosts l, posts p " +
                    "WHERE b.blogID=l.blogID AND l.postID=p.postID AND b.blogName = ? " +
						'AND (date(p.lastTrack), hour(p.lastTrack)) = ' +
						'(SELECT date(max(lastTrack)), hour(max(lastTrack)) FROM posts) ' +
                    "ORDER BY lastIncr DESC LIMIT ?;",
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
				'AND (date(p.lastTrack), hour(p.lastTrack)) = ' +
				'(SELECT date(max(lastTrack)), hour(max(lastTrack)) FROM posts) ' +
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

/* For each post to return, create a list of "tracks".
 * params:	res - response object to client
			bloghostname - name of blog
			order - Trending / Recent
			limit - # of posts to return
			callback - next function to call */
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
                            // callback(err);
                            callback();
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
        // DO NOT THROW ERR
        // if (err) throw err;
        callback(null, res, posts, order, limit);
    });
}

/* Send a response to the client.
 * params:	res - response object to client
			bloghostname - name of blog
			order - Trending / Recent
			limit - # of posts to return
			callback - next function to call */
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

/* Handle the list of liked posts returned by the hourly query to
 * Tumblr. Update the database if the post exists, or add if it does
 * not. Update the post statistics such as note_count.
 * param: output - the object returned from Tumblr */
exports.handlePosts = function(json, blogID){
	var likedPosts = json.response.liked_posts;
	var count = json.response.liked_count;

	async.forEach(likedPosts, function(post, callback){
		/*get current information about post in posts table*/
                  
		var query = 'SELECT * FROM posts WHERE postID = ?;';
		mysql.query(query,
                    [post.id],
					function(err, result, fields) {
						if (err){
							console.log(err);
                            // DO NOT THROW ERR!
							// throw err;
						} else if (result.length == 0){
							/*We don't have this post yet. Add it.*/
							addPost(post, updateTracks);
                            addLikedPosts(post, blogID, updateTracks);
						} else {
							/*We already have this post. Update it. */
							updatePost(post, result[0], updateTracks);
						}
					}
				   );
        callback();
	});
}

/* Add the post in the database.
 * param: post - an object returned from the Tumblr API.
 */
function addPost(post, callback){

    var postID = post.id;
    var postUrl = post.post_url;
    var postText = post.title||post.slug||post.caption||(post.blog_name + ' ' + blog.type + ' post: ' + post.post_url);
    var postImage = post.source_url || '';
    var postDate = post.date.substring(0, 19);
    var noteCount = post.note_count;

    mysql.query(
        'INSERT INTO posts values (?, ?, ?, ?, ?, 0, 0, ?, NOW());',
        [postID, postUrl, postText, postImage, postDate, noteCount],
        function(err, result, fields) {
            if (err){
                console.log(err);
                // throw err;
            } else {
                console.log('adding post ' + postID);

				/* Callback is updateTracks */
				callback(postID, 0, 0, noteCount);
            }
        }
    );
}

/* Add the likedPosts in the database.
 * param: post - an object returned from the Tumblr API.
 *        blogID - the ID of the blog
 */
function addLikedPosts(post, blogID, callback){
    
    var postID = post.id;
    var noteCount = post.note_count;
       mysql.query(
                'INSERT INTO likedPosts values (?, ?);',
                [blogID, postID],
                function(err, result, fields) {
                if (err){
                   console.log(err);
                // throw err;
                } else {
                   console.log('adding likedPosts ' + postID);
                }
            }
        );
}

/* Update a post that is already in the posts table.
   param: post - an object returned from the Tumblr API.
 */
function updatePost(post, result, callback){

	/*update the post entry table*/
	var lastSeq = result.lastSeq + 1;
	var lastIncr = post.note_count - result.lastCount;
	var lastCount = post.note_count; /*the 'last count' would be the current*/
	var query = 'UPDATE posts ' +
				'SET lastSeq = ?, ' +
					 'lastIncr = ?, ' +
					 'lastCount = ?, ' +
					 'lastTrack = NOW() ' +
				'WHERE postID = ?;';
	mysql.query(query, [lastSeq, lastIncr, lastCount, result.postID],
		function(err, result, fields){
			if (err){
				console.log(err);
                // DO NOT THROW ERR
				// throw err;
			} else {
				console.log("updating post " + post.id);
				/* callback is updateTracks */
				callback(post.id, lastSeq, lastIncr, lastCount);
			}
		}
	);
}

/* Update tracks table after a new post has been inserted, or an existing post
 * entry has been updated. */
function updateTracks(postID, lastSeq, lastIncr, lastCount){
	var updateTracksQuery = 'INSERT INTO tracks (postID, trackSeq, trackTime, trackIncr, noteCount) ' +
				'VALUES (?, ?, NOW(), ?, ?);';
	mysql.query(updateTracksQuery, [postID, lastSeq, lastIncr, lastCount],
		function(err, result, fields){
			if (err){
				console.log(err);
                // DO NOT THROW ERR
				// throw err;
			} else {
				console.log("updating tracks for " + postID + " " + lastSeq);
			}
		}
	);
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

/* Router to get all trending posts. */
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

/* Router to get all recent posts. */
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

// keeping a single connection open for server lifetime. good enough
// for assignment:
//
// todo opt. keep a connection pool
//
// mysql.end();

