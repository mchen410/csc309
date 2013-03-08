#!/bin/sh

# populate some blogs

curl --data "blog=blog.fastcompany.com/" https://localhost:30971/blogs
curl --data "blog=theatlantic.tumblr.com/" https://localhost:30971/blogs
curl --data "blog=condenasttraveler.tumblr.com/" https://localhost:30971/blogs
curl --data "blog=thisistheverge.tumblr.com/" https://localhost:30971/blogs


