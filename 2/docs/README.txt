MEMBERS

    Mary Chen                   998561612
    Aneeta Lutfee               998 413 168
    Mary Elaine Ramos Malit     998108417
    Trong Truong                995 94 222 6

ASSIGNMENT DETAILS:
The server is implemented using Node.js with Express. We used MySQL for
the database. 

Information for how to use our server is in userguide.txt. 

server.js - main router that directs the incoming client requests to their 
respective handlers

blogs.js - contains wrappers for the database queries

nodedb.js - database queries 

krone.js - handles the hourly updates

tumblrapi.js - contains the main function that queries the Tumblr API
hourly

DESIGN DECISIONS:

1) We keep a blog's full URL (i.e thisblog.tumblr.com or thisblog.com), since
some blogs hosted on Tumblr may not contain the tumblr domain.

2) Unliked posts by a blog would be retained in the likedPost database, just 
in case the blog decides to like it again; then all our tracking info would 
be retained.

3) Default limit if there's no limit provided is 55 (We should change this)

4) Posts that did not receive information in the last hourly update (due to Tumblr
returning only the 20 recent likes) are 


