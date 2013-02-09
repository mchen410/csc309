http = require('http');
var fs = require('fs');
path = require('path');
var utils = require('util');
var qs = require('querystring');
var URL = require('url');

topicsDatabase = {
    "topics": [
                  {
               	"title": "first topic evar!",
               			"link": "http://neopets.com",
               			"id" : "0",
               			"votes": 0,
               			"totalVotes" : 0,
               			"numComments" : 0,
               			"children": [
                // {
                // 	"text": "this has fewer comments",
				// 	"votes": 23,
				// 	"id" : "0x0",
				// 	"totalVotes" : 23,
				// 	"children": [
                //         {
                //             "text": "a small child",
				// 	        "votes": 2,
				// 	        "id" : "0x0x0",
				// 	        "totalVotes" : 2,
				// 	        "children": [
				// 	        ]
                //         }
				// 	]
                // },
				// {
				// 	"text": "This is my zeroth comment",
				// 	"votes": 234,
				// 	"id" : "0x1",
				// 	"totalVotes" : 234,
				// 	"children": [
				// 	]
				// }
               //	]
               //},
               //		{
               //			"title": "but this has more votes",
               //			"link": "http://heroku.com",
               //			"id" : "1",
               //			"votes": 1,
               //			"totalVotes" : 1,
               //			"numComments" : 0,
               //			"children": [
				// {
				// 	"text": "comment!!",
				// 	"votes": 2,
				// 	"id" : "1x0",
				// 	"totalVotes" : 225,
				// 	"children": [
				// 		{
				// 			"text": "Comment 6",
				// 			"votes": 223,
				// 			"totalVotes" : 223,
				// 			"id" : "1x0x0",
				// 			"children": []
				// 		}
				// 	]
				// },
				// {
				// 	"text": "comment!!",
				// 	"votes": 10,
				// 	"id" : "1x1",
				// 	"totalVotes" : 10,
				// 	"children": [
				// 		{
				// 			"text": "Comment 7",
				// 			"votes": 0,
				// 			"totalVotes" : 0,
				// 			"id" : "1x1x0",
				// 			"children": []
				// 		}
				// 	]
				// }
               		]
            }
	]
};

handler = function (req, res) {
    url = URL.parse(req.url);
    console.log('Request: ' + req.url);

    if (req.url == '/') {
        fs.readFile('./index.html', function (error, content) {
            if (error) {
                res.writeHead(200);
                console.log(error);
                res.end('<font color="red">404! Can\'t read index.html</font>')
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.end(content, 'utf-8');
            }
        });
    } else if (req.method == 'GET') {
        path = url.pathname.split('/');
        urlVar1 = path[path.length - 3];
        urlVar2 = path[path.length - 2];
        urlVar3 = path[path.length - 1];

        if (urlVar1 == 'topic') {
            topics = topicsDatabase.topics[urlVar2][urlVar3];

            var returnValue = {
                urlVar3: topics
            };
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(returnValue));

        } else if (urlVar3 == 'topics') {
            var returnValue = {
                "topics": topicsDatabase
            };
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(topicsDatabase));

        } else if (urlVar3 == "index.js"){
            fs.readFile('./index.js', function (error, content) {
                if (error) {
                    res.writeHead(200);
                    res.end('<font color="red">index.js: 404!</font>')
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/javascript'
                    });
                    res.end(content, 'utf-8');
                }
            });
        } else if (urlVar3 == "style.css"){
            fs.readFile('./style.css', function (error, content) {
                    if (error) {
                        res.writeHead(200);
                        res.end('<font color="red">style.css: 404!</font>')
                    } else {
                        res.writeHead(200, {
                                      'Content-Type': 'text/css'
                        });
                        res.end(content, 'utf-8');
                    }
            });
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("404!");
        }

    } else if (req.method == 'POST' && req.url == '/post/topic') {

        console.log("[200] " + req.method + " to " + req.url);
        var postTopicData = '';

        req.on('data', function (chunk) {
            // append the current chunk of data to the postTopicData variable
            postTopicData += chunk.toString();
			console.log(postTopicData);
        });

        req.on('end', function () {
            // request ended -> do something with the data
            res.writeHead(200, "OK", {
                'Content-Type': 'text/html'
            });

            // Format: topicTitle, topicLink, submit
            var postTopic = qs.parse(postTopicData);

            var newTopic = {
                "title": postTopic.topicTitle,
                "link": postTopic.topicLink,
                "id" : topicsDatabase.topics.length,
                "votes": 0,
                "totalVotes" : 0,
                "numComments" : 0,
                "children": []
            };
            topicsDatabase.topics.push(newTopic);

            //Debug
            //res.write('<html><head><title>Post data</title></head><body><pre>');
            //res.write(utils.inspect(topicsDatabase));
            //res.write('</pre></body></html>');
            //res.end();

			console.log(newTopic);

			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify(newTopic));
        });

    } else if (req.method == 'POST' && req.url == '/post/comment') {
        console.log("[200] " + req.method + " to " + req.url);
        var postCommentData = '';

        req.on('data', function (chunk) {
            // append the current chunk of data to the postTopicData variable
			postCommentData += chunk.toString();
			console.log(postCommentData);
        });

        req.on('end', function () {
            // commentText, commentTopic, commentPath, submit
            var postComment = qs.parse(postCommentData);

			//path example: 1:3:5:6, with 1 being the id of the topic
			//and 6 being the direct parent of the new comment
			cPath = postComment.commentPath.split('x');
			console.log(cPath[0]);

			var newComment = {
				"text" : postComment.commentText,
				"votes" : 0,
                "totalVotes" : 0,
				"id" : "",
				"children" : []
			};

			//If comment is top level
			var parentNode = topicsDatabase.topics[parseInt(cPath[0])];
			parentNode.numComments += 1;
			if (cPath.length != 1) {
				for (var i = 1; i < cPath.length; i++) {
					parentNode = parentNode["children"][parseInt(cPath[i])];
				}
			}
			newComment.id = postComment.commentPath + 'x' + parentNode.children.length;
			parentNode["children"].push(newComment);

            //Debug
            //res.write('<html><head><title>Post data</title></head><body><pre>');
            //res.write(utils.inspect(topicsDatabase.topics));
            //res.write('<br />');
            //res.write(utils.inspect(topicsDatabase["topics"][parseInt(postComment.commentTopic)]["comments"]));
            //res.write('</pre></body></html>');

			console.log(newComment);

			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify(newComment));
        });

    } else if (req.method == 'POST') {
        // Counting votes
        var path = url.pathname.split('/');
		console.log(url.pathname);
        if (path[path.length - 2] != 'vote') {
            console.log("[404] " + req.method + " to " + req.url);
            res.writeHead(404, "Page Not Found", {
                'Content-Type': 'text/html'
            });
            res.end('<html><head><title>404</title></head><body><h1>404 Page Not Found</h1></body></html>');
        }

		var itemPath = path[path.length - 1];
		var cPath = itemPath.split('x');
		var nodeUpvoted = topicsDatabase.topics[parseInt(cPath[0])];
		nodeUpvoted.totalVotes += 1;

		//If upvoted item is a comment
		if (cPath.length != 1) {
			for (var i = 1; i < cPath.length; i++) {
				nodeUpvoted = nodeUpvoted.children[parseInt(cPath[i])];
				nodeUpvoted.totalVotes += 1;
			}
		}

		//Increment votes by 1
		nodeUpvoted.votes += 1;

		console.log(nodeUpvoted);

		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(JSON.stringify(nodeUpvoted));

    } else {
        console.log("[404] " + req.method + " to " + req.url);
        res.writeHead(404, "Page Not Found", {
            'Content-Type': 'text/html'
        });
        res.end('<html><head><title>404</title></head><body><h1>404 Page Not Found</h1></body></html>');
    }
};

var host = '127.0.0.1';
var port = process.env.PORT || 30975;

http.createServer(handler).listen(port);

console.log('Server running at http://127.0.0.1:' + port + '/. Go check it out!');
