var mysql = require("./nodedb");

// front page:
exports.frontDesk = function(req, res){
    res.send("hello NEO, the ORACLE has been expecting you....");
}

exports.addBlog = function(req, res) {
    //extract the blogname
    var blogName = req.params.blog;

	/* Retrieve blog's likes. This will also tell us if the blog is valid 
	//var posts = http://api.tumblr.com/v2/blog/blogName.tumblr.com/likes
	//check if valid:
	if (posts.meta.status == 404){
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

// testing routing and db connection:
// todo. replace with real functility
exports.getAllTrends = function(req, res) {
    //mysql.getallblogs(); // example call to method exported from ./nodedb.js
    //res.send("here's your gundam response!");
	
}

exports.getBlogTrends = function(req, res) {

}
