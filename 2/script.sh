#!/bin/sh

# populate some blogs

curl --data "blog=blog.fastcompany.com" https://localhost:30971/blogs
curl --data "blog=theatlantic.tumblr.com" https://localhost:30971/blogs
curl --data "blog=condenasttraveler.tumblr.com" https://localhost:30971/blogs
curl --data "blog=thisistheverge.tumblr.com" https://localhost:30971/blogs


# Get posts of some blog  

# 1- blog=blog.fastcompany.com
curl --data "order=Trending" http://localhost:30975/blog/blog.fastcompany.tumblr/trends
curl --data "order=Trending&limit=10" http://localhost:30975/blog/blog.fastcompany.tumblr/trends

# Test with different possibilities of limit (this test is applied for only one
# blog inorder to test the limit property.
curl --data "order=Trending&limit=0" http://localhost:30975/blog/blog.fastcompany.tumblr/trends
curl --data "order=Trending&limit=1" http://localhost:30975/blog/blog.fastcompany.tumblr/trends
curl --data "order=Trending&limit=5" http://localhost:30975/blog/blog.fastcompany.tumblr/trends
curl --data "order=Trending&limit=100" http://localhost:30975/blog/blog.fastcompany.tumblr/trends


curl --data "order=Recent" http://localhost:30975/blog/blog.fastcompany.tumblr/trends
curl --data "order=Recent&limit=10" http://localhost:30975/blog/blog.fastcompany.tumblr/trends


# ---------------------------------------------------------------------------------

# 2- blog=theatlantic.tumblr.com
curl --data "order=Trending" http://localhost:30975/blog/theatlantic.tumblr.com/trends
curl --data "order=Trending&limit=10" http://localhost:30975/blog/theatlantic.tumblr.com/trends

curl --data "order=Recent" http://localhost:30975/blog/theatlantic.tumblr.com/trends
curl --data "order=Recent&limit=10" http://localhost:30975/blog/theatlantic.tumblr.com/trends

# ---------------------------------------------------------------------------------

# 3- blog=condenasttraveler.tumblr.com
curl --data "order=Trending" http://localhost:30975/blog/condenasttraveler.tumblr.com/trends
curl --data "order=Trending&limit=10" http://localhost:30975/blog/condenasttraveler.tumblr.com/trends

curl --data "order=Recent" http://localhost:30975/blog/condenasttraveler.tumblr.com/trends
curl --data "order=Recent&limit=10" http://localhost:30975/blog/condenasttraveler.tumblr.com/trends


# ---------------------------------------------------------------------------------

# 4- blog=thisistheverge.tumblr.com
curl --data "order=Trending" http://localhost:30975/blog/thisistheverge.tumblr.com/trends
curl --data "order=Trending&limit=10" http://localhost:30975/blog/thisistheverge.tumblr.com/trends

curl --data "order=Recent" http://localhost:30975/blog/thisistheverge.tumblr.com/trends
curl --data "order=Recent&limit=10" http://localhost:30975/blog/thisistheverge.tumblr.com/trends


# ---------------------------------------------------------------------------------
# ---------------------------------------------------------------------------------

# Get posts in general
curl --data "order=Trending" http://localhost:30975/blogs/trends
curl --data "order=Trending&limit=0" http://localhost:30975/blogs/trends
curl --data "order=Trending&limit=1" http://localhost:30975/blogs/trends
curl --data "order=Trending&limit=10" http://localhost:30975/blogs/trends
curl --data "order=Trending&limit=100" http://localhost:30975/blogs/trends


curl --data "order=Recent" http://localhost:30975/blogs/trends
curl --data "order=Trending&limit=0" http://localhost:30975/blogs/trends
curl --data "order=Trending&limit=1" http://localhost:30975/blogs/trends
curl --data "order=Trending&limit=10" http://localhost:30975/blogs/trends
curl --data "order=Trending&limit=100" http://localhost:30975/blogs/trends
