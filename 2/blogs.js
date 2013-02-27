var mysql = require("./nodedb");

// front page:
exports.frontDesk = function(req, res){
    // res.send("hello NEO, the ORACLE has been expecting you....");
    res.render("index.html");
}

exports.addBlog = function(req, res) {
    //extract the blogname
    var blogName = req.params.blog;

	/* Retrieve blog's likes. This will also tell us if the blog is valid 
	//var posts = http://api.tumblr.com/v2/blog/blogName.tumblr.com/likes
	//check if valid:
	if (posts.meta.status == 404){
		res.writeHead(400, "Invalid blog name", {
			'Content-Type': 'text/html'
		});
		res.end('404! ' + blogName + ' Not Found.');
	}*/
	
	//insert into database
    mysql.addBlog(blogName);
	console.log('new blog: ' + blogName);
	
	//now insert all the posts liked by this blog in likedPosts

	//response: successful
	res.writeHead(200, {
		'Content-Type': 'text/html'
	});
	res.end(content, 'utf-8');
}

/*
 * Return a JSON of all posts with largest increment (if trending)
 * or with most recent post time (if recent).
 */
exports.getAllTrends = function(req, res) {

	var order = req.query.order;
	var limit = req.query.limit;
	if (!limit){
		limit = 10; //set default;
	}
	console.log('get all trending with order: ' + order + ' and limit ' + limit);
	
	var dbResult;
	if (order == 'trending'){
		//dbResult = mysql.getAllTrending;
	} else if (order == 'recent') {
		//debResult = mysql.getAllRecent;
	} else {
		res.writeHead(400, "Incorrect order argument", {
			'Content-Type': 'text/html'
		});
		res.end('404: Incorrect order argument');
	}
	
	//jsonify dbResult

}

exports.getBlogTrends = function(req, res) {
    var bh = req.params.baseHostname;
    var limit = req.query.limit;
    var order = req.query.order;

    // todo
    // todo
    // todo

    if (limit && order == "Recent"){

    } else if (limit && order == "Trending"){

    } else if (!limit && order == "Recent"){

    } else if (!limit && order == "Trending"){
        mysql.getBlogTrendingNolimit(res, bh);
    }
}

