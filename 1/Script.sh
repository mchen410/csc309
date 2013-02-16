#!/bin/sh

#  Script.sh

# populate some topics

echo "this is a test script to populate the database"
curl --data "topicTitle=my%20first%20topic&topicLink=http://yahoo.com" http://localhost:30975/post/topic
curl --data "topicTitle=my%20second%20topic&topicLink=http://hotmail.com" http://localhost:30975/post/topic
curl --data "topicTitle=my%20third%20topic&topicLink=http://twitter.com" http://localhost:30975/post/topic
curl --data "topicTitle=my%20fourth%20topic&topicLink=http://facebook.com" http://localhost:30975/post/topic


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
curl --data "commentText=my%20first%20comment%20on%20my%20first%20topic&commentPath=0" http://localhost:30975/post/comment
curl --data "commentText=my%20second%20comment%20on%20my%20first%20topic&commentPath=0" http://localhost:30975/post/comment
curl --data "commentText=my%20third%20comment%20on%20my%20first%20topic&commentPath=0" http://localhost:30975/post/comment
curl --data "commentText=my%20fourth%20comment%20on%20my%20first%20topic&commentPath=0" http://localhost:30975/post/comment

# upvote comments of first topic
curl --data "" http://localhost:30975/vote/0x0
curl --data "" http://localhost:30975/vote/0x0
curl --data "" http://localhost:30975/vote/0x0

curl --data "" http://localhost:30975/vote/0x1
curl --data "" http://localhost:30975/vote/0x1

curl --data "" http://localhost:30975/vote/0x2

curl --data "" http://localhost:30975/vote/0x3
curl --data "" http://localhost:30975/vote/0x3
curl --data "" http://localhost:30975/vote/0x3
curl --data "" http://localhost:30975/vote/0x3
curl --data "" http://localhost:30975/vote/0x3
curl --data "" http://localhost:30975/vote/0x3

# add comments to second topic
curl --data "commentText=my%20first%20comment%20on%20my%20second%20topic&commentPath=1" http://localhost:30975/post/comment
curl --data "commentText=my%20second%20comment%20on%20my%20second%20topic&commentPath=1" http://localhost:30975/post/comment
curl --data "commentText=my%20third%20comment%20on%20my%20second%20topic&commentPath=1" http://localhost:30975/post/comment
curl --data "commentText=my%20fourth%20comment%20on%20my%20second%20topic&commentPath=1" http://localhost:30975/post/comment

# upvote comments of second topic
curl --data "" http://localhost:30975/vote/1x0
curl --data "" http://localhost:30975/vote/1x0

curl --data "" http://localhost:30975/vote/1x1

curl --data "" http://localhost:30975/vote/1x2
curl --data "" http://localhost:30975/vote/1x2
curl --data "" http://localhost:30975/vote/1x2
curl --data "" http://localhost:30975/vote/1x2

curl --data "" http://localhost:30975/vote/1x3
curl --data "" http://localhost:30975/vote/1x3
curl --data "" http://localhost:30975/vote/1x3

# add comments to third topic
curl --data "commentText=my%20first%20comment%20on%20my%20third%20topic&commentPath=2" http://localhost:30975/post/comment
curl --data "commentText=my%20second%20comment%20on%20my%20third%20topic&commentPath=2" http://localhost:30975/post/comment
curl --data "commentText=my%20third%20comment%20on%20my%20third%20topic&commentPath=2" http://localhost:30975/post/comment
curl --data "commentText=my%20fourth%20comment%20on%20my%20third%20topic&commentPath=2" http://localhost:30975/post/comment

# add comments to fourth topic
curl --data "commentText=my%20first%20comment%20on%20my%20forth%20topic&commentPath=3" http://localhost:30975/post/comment
curl --data "commentText=my%20second%20comment%20on%20my%20forth%20topic&commentPath=3" http://localhost:30975/post/comment
curl --data "commentText=my%20third%20comment%20on%20my%20forth%20topic&commentPath=3" http://localhost:30975/post/comment
curl --data "commentText=my%20fourth%20comment%20on%20my%20forth%20topic&commentPath=3" http://localhost:30975/post/comment

# Grenerate nested comments

# add comments to the first topics first comment
curl --data "commentText=my%20first%20comment%20on%20my%20first%20topic's%20first%20comment&commentPath=0x0" http://localhost:30975/post/comment
curl --data "commentText=my%20second%20comment%20on%20my%20first%20topic's%20first%20comment&commentPath=0x0" http://localhost:30975/post/comment

# nested comment (third level)
curl --data "commentText=my%20first%20comment%20on%20my%20first%20topic%20nested%20three%20levels&commentPath=0x0x0" http://localhost:30975/post/comment
curl --data "commentText=my%20second%20comment%20on%20my%20first%20topic%20nested%20three%20levels&commentPath=0x0x0" http://localhost:30975/post/comment

# nested comment (fourth level)
curl --data "commentText=my%20first%20comment%20on%20my%20first%20topic%20nested%20four%20levels&commentPath=0x0x0x0" http://localhost:30975/post/comment
curl --data "commentText=my%20second%20comment%20on%20my%20first%20topic%20nested%20four%20levels&commentPath=0x0x0x0" http://localhost:30975/post/comment


# nested comment (fifth level)
curl --data "commentText=my%20first%20comment%20on%20my%20first%20topic%20nested%20five%20levels&commentPath=0x0x0x0x0" http://localhost:30975/post/comment
curl --data "commentText=my%20second%20comment%20on%20my%20first%20topic%20nested%20five%20levels&commentPath=0x0x0x0x0" http://localhost:30975/post/comment


# Grenerate nested comments

# add comments to the first topics second comment
curl --data "commentText=my%20first%20comment%20on%20my%20first%20topic's%20second%20comment&commentPath=0x1" http://localhost:30975/post/comment
curl --data "commentText=my%20second%20comment%20on%20my%20first%20topic's%20second%20comment&commentPath=0x1" http://localhost:30975/post/comment

# nested comment (third level)
curl --data "commentText=my%20first%20comment%20on%20my%20first%20topic%20nested%20three%20levels&commentPath=0x1x0" http://localhost:30975/post/comment
curl --data "commentText=my%20second%20comment%20on%20my%20first%20topic%20nested%20three%20levels&commentPath=0x1x0" http://localhost:30975/post/comment


# nested comment (fourth level)
curl --data "commentText=my%20first%20comment%20on%20my%20first%20topic%20nested%20four%20levels&commentPath=0x1x0x0" http://localhost:30975/post/comment
curl --data "commentText=my%20second%20comment%20on%20my%20first%20topic%20nested%20four%20levels&commentPath=0x1x0x0" http://localhost:30975/post/comment


# nested comment (fifth level)
curl --data "commentText=my%20first%20comment%20on%20my%20first%20topic%20nested%20five%20levels&commentPath=0x1x0x0x0" http://localhost:30975/post/comment
curl --data "commentText=my%20second%20comment%20on%20my%20first%20topic%20nested%20five%20levels&commentPath=0x1x0x0x0" http://localhost:30975/post/comment

# upvote nested comments
curl --data "" http://localhost:30975/vote/0x1x0x0x0x1
curl --data "" http://localhost:30975/vote/0x1x0x0x0x1

curl --data "" http://localhost:30975/vote/0x1x0x0x0
curl --data "" http://localhost:30975/vote/0x1x0x0x0

curl --data "" http://localhost:30975/vote/0x1x0x0

curl --data "" http://localhost:30975/vote/0x1x0
curl --data "" http://localhost:30975/vote/0x1x0
curl --data "" http://localhost:30975/vote/0x1x0
curl --data "" http://localhost:30975/vote/0x1x0
