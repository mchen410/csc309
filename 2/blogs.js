var mysql = require("./nodedb");

// front page:
exports.frontDesk = function(req, res){
    // res.send("hello NEO, the ORACLE has been expecting you....");
    res.render("index.html");
}

exports.addBlog = function(req, res) {
    //extract the blogname
    var blogName = req.params.blog;

	//we have to validate this blogName
	
	//insert into database
    mysql.addBlog(blogName);
	console.log('new blog: ' + blogName);
	
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
	
	if (order == 'Trending'){
		mysql.getAllTrending(res, limit);
	} else if (order == 'Recent') {
		mysql.getAllRecent(res, limit);
	} else {
		res.writeHead(400, "Incorrect order argument", {
			'Content-Type': 'text/html'
		});
		res.end('404: Incorrect order argument. Please try "Trending" or "Recent".');
	}
}

exports.getBlogTrends = function(req, res) {
    var bh = req.params.baseHostname;
    var limit = req.query.limit;
    var order = req.query.order;

    // todo
    // todo
    // todo

    if (limit && order == "Recent"){
        mysql.getBlogRecentWithLimit(res, bh, order, limit);
    } else if (limit && order == "Trending"){
        mysql.getBlogTrendingWithLimit(res, bh, order, limit);
    } else if (!limit && order == "Recent"){
        mysql.getBlogRecentNoLimit(res, bh, order);
    } else if (!limit && order == "Trending"){
        mysql.getBlogTrendingNolimit(res, bh, order);
    }
}

