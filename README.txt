Group Members:
Mary Chen (998561612)
Trong Truong (995 94 222 6)
Mary Elaine Ramos Malit (998108417)
Aneeta Lutfee (998 413 168)  

Documentation:

Data Structure – The main structure is a list of topics.

Topics - Each topic is a dictionary. It keeps track of its title (the
main text of the topic), its link, the number of votes it has, the
number of total votes it and its comments have, and the number of
comments it has. It also has a unique id, which is its index in the
list of topics. We view a topic as a tree, and use the topic's id as
the root of  the path. Its children are comments, and it can have any
number of these.  It stores its children as a list of dictionaries.

Comments – Each comment is a dictionary. It keeps track of its text,
number of votes, and number of total votes that it and its children
has. Like a topic, a comment has an id, which is its path in the topic
tree. It also keeps track of its comments, and it stores its comments
as a list of dictionaries.

Path – An example path is "0x1x3". The element that has this id is the
3rd comment of the 1st comment on the 0th topic. All indices begin at
0.

REST API:
Domain: topic, comment, vote
Core Functions: post topic, post comment, get topic, get comment, upvote, get vote

GET examples:
http://localhost:30975/topics -> returns the whole database of topics,
including children
http://localhost:30975/topic/id/attribute -> returns the attribute for 
the topic with id equal to id

POST examples:
http://localhost:30975/post/topic -> data sent to server is topicTitle=title&topicLink=link;
Post a topic with the given title and link; server returns a JSON dictionary
with attributes set to given data and other defaults.
http://localhost:30975/post/comment -> data sent to server is commentText=comment&commentPath=path;
Post a comment with the given text. The path is the path to its parent, so
server knows where in the database to add this new comment. Server returns
a JSON comment dictionary with attributes set to given data, and other defaults.
http://localhost:30975/vote/path -> data sent to server is the path to the
node that is receiving the upvote. Server returns a JSON of the upvoted node.