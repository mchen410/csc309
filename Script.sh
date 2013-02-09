#!/bin/sh

#  Script.sh

# populate some topics

echo "this is a test script to populate the database"
curl --data "topicTitle=my%20first%20topic&topicLink=http://yahoo.com" http://localhost:30975/post/topic
curl --data "topicTitle=my%20second%20topic&topicLink=http://hotmail.com" http://localhost:30975/post/topic
curl --data "topicTitle=my%20third%20topic&topicLink=http://twitter.com" http://localhost:30975/post/topic
curl --data "topicTitle=my%20forth%20topic&topicLink=http://facebook.com" http://localhost:30975/post/topic


# vote on topics
curl --data "" http://localhost:30975/vote/0
curl --data "" http://localhost:30975/vote/0
curl --data "" http://localhost:30975/vote/0
curl --data "" http://localhost:30975/vote/0
curl --data "" http://localhost:30975/vote/0
curl --data "" http://localhost:30975/vote/0
curl --data "" http://localhost:30975/vote/0

curl --data "" http://localhost:30975/vote/1
curl --data "" http://localhost:30975/vote/1
curl --data "" http://localhost:30975/vote/1
curl --data "" http://localhost:30975/vote/1
curl --data "" http://localhost:30975/vote/1
curl --data "" http://localhost:30975/vote/1
curl --data "" http://localhost:30975/vote/1
curl --data "" http://localhost:30975/vote/1
curl --data "" http://localhost:30975/vote/1
curl --data "" http://localhost:30975/vote/1
curl --data "" http://localhost:30975/vote/1

curl --data "" http://localhost:30975/vote/2
curl --data "" http://localhost:30975/vote/2
curl --data "" http://localhost:30975/vote/2
curl --data "" http://localhost:30975/vote/2
curl --data "" http://localhost:30975/vote/2


curl --data "" http://localhost:30975/vote/3
curl --data "" http://localhost:30975/vote/3
curl --data "" http://localhost:30975/vote/3
curl --data "" http://localhost:30975/vote/3
curl --data "" http://localhost:30975/vote/3
curl --data "" http://localhost:30975/vote/3




# add comments to first topic
curl --data "commentText=my%20first%20comment%20on%20my%20first%20topic&commentPath=1" http://localhost:30975/post/comment
curl --data "commentText=my%20second%20comment%20on%20my%20first%20topic&commentPath=1" http://localhost:30975/post/comment
curl --data "commentText=my%20third%20comment%20on%20my%20first%20topic&commentPath=1" http://localhost:30975/post/comment
curl --data "commentText=my%20forth%20comment%20on%20my%20first%20topic&commentPath=1" http://localhost:30975/post/comment

# add vote to comments of first topic



# add comments to second topic
curl --data "commentText=my%20first%20comment%20on%20my%20second%20topic&commentPath=2" http://localhost:30975/post/comment
curl --data "commentText=my%20second%20comment%20on%20my%20second%20topic&commentPath=2" http://localhost:30975/post/comment
curl --data "commentText=my%20third%20comment%20on%20my%20second%20topic&commentPath=2" http://localhost:30975/post/comment
curl --data "commentText=my%20forth%20comment%20on%20my%20second%20topic&commentPath=2" http://localhost:30975/post/comment

# add comments to third topic
curl --data "commentText=my%20first%20comment%20on%20my%20third%20topic&commentPath=3" http://localhost:30975/post/comment
curl --data "commentText=my%20second%20comment%20on%20my%20third%20topic&commentPath=3" http://localhost:30975/post/comment
curl --data "commentText=my%20third%20comment%20on%20my%20third%20topic&commentPath=3" http://localhost:30975/post/comment
curl --data "commentText=my%20forth%20comment%20on%20my%20third%20topic&commentPath=3" http://localhost:30975/post/comment


# add comments to forth topic
curl --data "commentText=my%20first%20comment%20on%20my%20forth%20topic&commentPath=4" http://localhost:30975/post/comment
curl --data "commentText=my%20second%20comment%20on%20my%20forth%20topic&commentPath=4" http://localhost:30975/post/comment
curl --data "commentText=my%20third%20comment%20on%20my%20forth%20topic&commentPath=4" http://localhost:30975/post/comment
curl --data "commentText=my%20forth%20comment%20on%20my%20forth%20topic&commentPath=4" http://localhost:30975/post/comment


# Grenerate nested comments

# add comments to the first topics first comment
curl --data "commentText=my%20first%20comment%20on%20my%20first%20topic's%20first%20comment&commentPath=1x0" http://localhost:30975/post/comment
curl --data "commentText=my%20second%20comment%20on%20my%20first%20topic's%20first%20comment&commentPath=1x0" http://localhost:30975/post/comment

# nested comment (third level)
curl --data "commentText=my%20first%20comment%20on%20my%20first%20topic%20nested%20three%20levels&commentPath=1x0x0" http://localhost:30975/post/comment
curl --data "commentText=my%20second%20comment%20on%20my%20first%20topic%20nested%20three%20levels&commentPath=1x0x0" http://localhost:30975/post/comment


# nested comment (forth level)
curl --data "commentText=my%20first%20comment%20on%20my%20first%20topic%20nested%20four%20levels&commentPath=1x0x0x0" http://localhost:30975/post/comment
curl --data "commentText=my%20second%20comment%20on%20my%20first%20topic%20nested%20four%20levels&commentPath=1x0x0x0" http://localhost:30975/post/comment


# nested comment (fifth level)
curl --data "commentText=my%20first%20comment%20on%20my%20first%20topic%20nested%20five%20levels&commentPath=1x0x0x0x0" http://localhost:30975/post/comment
curl --data "commentText=my%20second%20comment%20on%20my%20first%20topic%20nested%20five%20levels&commentPath=1x0x0x0x0" http://localhost:30975/post/comment


# Grenerate nested comments

# add comments to the first topics second comment
curl --data "commentText=my%20first%20comment%20on%20my%20first%20topic's%20second%20comment&commentPath=1x1" http://localhost:30975/post/comment
curl --data "commentText=my%20second%20comment%20on%20my%20first%20topic's%20second%20comment&commentPath=1x1" http://localhost:30975/post/comment

# nested comment (third level)
curl --data "commentText=my%20first%20comment%20on%20my%20first%20topic%20nested%20three%20levels&commentPath=1x1x0" http://localhost:30975/post/comment
curl --data "commentText=my%20second%20comment%20on%20my%20first%20topic%20nested%20three%20levels&commentPath=1x1x0" http://localhost:30975/post/comment


# nested comment (forth level)
curl --data "commentText=my%20first%20comment%20on%20my%20first%20topic%20nested%20four%20levels&commentPath=1x1x0x0" http://localhost:30975/post/comment
curl --data "commentText=my%20second%20comment%20on%20my%20first%20topic%20nested%20four%20levels&commentPath=1x1x0x0" http://localhost:30975/post/comment


# nested comment (fifth level)
curl --data "commentText=my%20first%20comment%20on%20my%20first%20topic%20nested%20five%20levels&commentPath=1x1x0x0x0" http://localhost:30975/post/comment
curl --data "commentText=my%20second%20comment%20on%20my%20first%20topic%20nested%20five%20levels&commentPath=1x1x0x0x0" http://localhost:30975/post/comment




# add comments to comments


# upvote topics


# upvote comments
