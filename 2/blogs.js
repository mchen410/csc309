var mysql = require("./nodedb");

// front page:
exports.frontDesk = function(req, res){
    // res.send("hello NEO, the ORACLE has been expecting you....");
    res.render("index.html");
}

/* Add a new blog to blogs table. */
exports.addBlog = function(req, res) {
    //extract the blogname
    var blogName = req.body.blog || req.query.blog;

	//we have to validate this blogName

	//insert into database
    mysql.addBlog(blogName, req, res);
	console.log('new blog: ' + blogName);
}

// todo. input validation
exports.getPostsTracks = function(req, res) {
    var bh = req.params.baseHostname;
    var limit = req.query.limit || req.body.limit;
    var order = req.query.order || req.body.order;
    mysql.getPostsTracks(res, bh, order, limit);
}

