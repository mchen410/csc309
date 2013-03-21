var mysql = require("./nodedb");
var http = require('http');

var tumblrGet = {
    host: 'api.tumblr.com',
    path: '/v2/blog/',
    method: 'GET',
    headers: {
            'Content-Type': 'application/json'
    }
};

var apiKey = 'SR4t4ORhyC4rGwrs9uNIweXS6nE7nGtOLMuZLacKUoSlJIDKuC';

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

    if (bh) {
        console.log('Getting from http://api.tumblr.com/v2/blog/' + bh + '/' + 'likes');

        //Copy tumblrGet
        var options = {};
        for( var key in tumblrGet )
            options[key] = tumblrGet[key];

        //Append blog id to the options variable and add the API key
        options['path'] += bh + '/likes?api_key=' + apiKey;

        console.log(options['path']);
        var output = '';

        //Make GET request to Tumblr
        var request = http.request(options, function(response) {
            console.log('getting request');
            response.setEncoding('utf8');

            response.on('data', function(chunk) {
                output += chunk;
            });

            response.on('end', function() {
                try {
                    var json = JSON.parse(output);
                    console.log(json);
                } catch (e){
                    res.send(404);
                }
                if (json.meta.status == "200"){
                    console.log("status is 200");
                    mysql.getPostsTracks(res, bh, order, limit);
                } else {
                    console.log("invalid blog request");
                    res.send(404);
                }
            });
        });
        request.end();

    } else {
        mysql.getPostsTracks(res, bh, order, limit);
    }
}
