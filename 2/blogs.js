var mysql = require("./nodedb");

// front page:
exports.frontDesk = function(req, res){
    // res.send("hello NEO, the ORACLE has been expecting you....");
    res.render("index.html");
}

exports.addBlog = function(req, res) {
    //extract the blogname
    var blogName = req.body.blog;

	//we have to validate this blogName

	//insert into database
    mysql.addBlog(blogName, req, res);
	console.log('new blog: ' + blogName);
}

// /*
//  * Return a JSON of all posts with largest increment (if trending)
//  * or with most recent post time (if recent).
//  */
// exports.getAllTrends = function(req, res) {

// 	var order = req.query.order;
// 	var limit = req.query.limit;
// 	if (!limit){
// 		limit = 10; //set default;
// 	}
// 	console.log('get all trending with order: ' + order + ' and limit ' + limit);

// 	if (order == 'Trending'){
// 		mysql.getAllTrending(res, limit);
// 	} else if (order == 'Recent') {
// 		mysql.getAllRecent(res, limit);
// 	} else {
// 		res.writeHead(400, "Incorrect order argument", {
// 			'Content-Type': 'text/html'
// 		});
// 		res.end('404: Incorrect order argument. Please try "Trending" or "Recent".');
// 	}
// }

// todo. input validation
exports.getPostsTracks = function(req, res) {
    var bh = req.params.baseHostname;
    var limit = req.query.limit;
    var order = req.query.order;
    mysql.getPostsTracks(res, bh, order, limit);
}

