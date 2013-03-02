CREATE SCHEMA IF NOT EXISTS `csc309h_g1malitm`;
USE `csc309h_g1malitm`;
-- GRANT ALL ON *.* to 'g1malitm'@'localhost' IDENTIFIED BY 'tahziehe';
-- FLUSH PRIVILEGES;

-- -----------------------------------------------------
-- Create tables for blogs, user-post relationship, and posts
-- -----------------------------------------------------
DROP TABLE IF EXISTS `likedPosts` CASCADE;
DROP TABLE IF EXISTS `tracks` CASCADE;
DROP TABLE IF EXISTS `posts` CASCADE;
DROP TABLE IF EXISTS `blogs` CASCADE;

CREATE TABLE IF NOT EXISTS blogs(
	blogID		INT NOT NULL AUTO_INCREMENT,
	blogName 	varchar(124),
	PRIMARY KEY (blogID)
);

CREATE TABLE IF NOT EXISTS posts(
	postID 		INT, -- same as tumblr postID
	url			varchar(124),
	text    	varchar(500), -- change to type TEXT
	image		varchar(124), -- URL of the image
	datePosted	DATETIME, --
	lastSeq		INT, -- don't make this guy reference tracks, because tracks references postID: circular reference
    lastIncr    INT, -- so we can sort by increment
	lastCount	INT,
	lastTrack	DATETIME,
	PRIMARY KEY (postID)
);

CREATE TABLE IF NOT EXISTS likedPosts(
	blogID	 	integer,
	postID		integer,
	FOREIGN KEY (blogID) REFERENCES blogs(blogID),
	FOREIGN KEY (postID) REFERENCES posts(postID),
	PRIMARY KEY (blogID, postID)
);

CREATE TABLE IF NOT EXISTS tracks(
	postID		INT,
	trackSeq	INT,
	trackTime	DATETIME,
	trackIncr	INT,
	noteCount	INT,
	FOREIGN KEY (postID) REFERENCES posts(postID),
	PRIMARY KEY (postID, trackSeq)
);

-- sample data
-- sample data
-- sample data

-- blogs

INSERT INTO blogs(blogID, blogName) VALUES(1, 'myawesomeblog.tumblr.com');
INSERT INTO blogs(blogID, blogName) VALUES(2, 'woowah.tumblr.com');
INSERT INTO blogs(blogID, blogName) VALUES(3, 'a.tumblr.com');
INSERT INTO blogs(blogID, blogName) VALUES(4, 'b.tumblr.com');
INSERT INTO blogs(blogID, blogName) VALUES(5, 'c.tumblr.com');
INSERT INTO blogs(blogID, blogName) VALUES(6, 'd.tumblr.com');
INSERT INTO blogs(blogID, blogName) VALUES(7, 'e.tumblr.com');
INSERT INTO blogs(blogID, blogName) VALUES(8, 'f.tumblr.com');
INSERT INTO blogs(blogID, blogName) VALUES(9, 'g.tumblr.com');

-- posts

-- note. both of these posts are liked by blogID=2

INSERT INTO posts (
    postID,
    url,
	text,
	image,
	datePosted,
	lastSeq,
    lastIncr,
	lastCount,
	lastTrack
) VALUES (
    '423523523',
    'asdf.tumblr.com/post/2342323598235879',
    'text for woowah',
    '', -- empty image link
    '2011-02-25 20:27:00',
    '0', -- only tracking one post in tracks
    '123', -- incremented from 0
    '123',
    '2011-02-25 21:27:00'
);

INSERT INTO posts (
    postID,
    url,
	text,
	image,
	datePosted,
	lastSeq,
    lastIncr,
	lastCount,
	lastTrack
) VALUES (
    '23463636',
    'another.tumblr.com/post/123123',
    '', -- empty text
    'blah.com/pic.ipeg',
    '2011-02-24 21:27:00',
    '2',
    '24',
    '124',
    '2011-02-25 22:27:00'
);

INSERT INTO posts (
    postID,
    url,
	text,
	image,
	datePosted,
	lastSeq,
    lastIncr,
	lastCount,
	lastTrack
) VALUES (
    '42424141',
    'postOne.tumblr.com/post/4242424141',
    '', -- empty text
    'blah.com/pic.ipeg',
    '2011-06-24 2:27:00',
    '5',
    '24',
    '124',
    '2011-06-25 7:27:00'
);

INSERT INTO posts (
    postID,
    url,
	text,
	image,
	datePosted,
	lastSeq,
    lastIncr,
	lastCount,
	lastTrack
) VALUES (
    '22222222',
    'postTwo.tumblr.com/post/4242424141',
    '', -- empty text
    'blah.com/pic.ipeg',
    '2011-06-23 2:27:00',
    '5',
    '24',
    '124',
    '2011-06-25 7:27:00'
);

INSERT INTO posts (
    postID,
    url,
	text,
	image,
	datePosted,
	lastSeq,
    lastIncr,
	lastCount,
	lastTrack
) VALUES (
    '33333333',
    'postThree.tumblr.com/post/4242424141',
    '', -- empty text
    'blah.com/pic.ipeg',
    '2011-06-20 2:27:00',
    '5',
    '24',
    '124',
    '2011-06-25 7:27:00'
);

INSERT INTO posts (
    postID,
    url,
	text,
	image,
	datePosted,
	lastSeq,
    lastIncr,
	lastCount,
	lastTrack
) VALUES (
    '4444444',
    'postFour.tumblr.com/post/4242424141',
    '', -- empty text
    'blah.com/pic.ipeg',
    '2011-06-24 12:27:00',
    '5',
    '24',
    '124',
    '2011-06-25 7:27:00'
);

INSERT INTO posts (
    postID,
    url,
	text,
	image,
	datePosted,
	lastSeq,
    lastIncr,
	lastCount,
	lastTrack
) VALUES (
    '5555555',
    'postFive.tumblr.com/post/4242424141',
    '', -- empty text
    'blah.com/pic.ipeg',
    '2011-06-24 10:27:00',
    '5',
    '24',
    '124',
    '2011-06-25 7:27:00'
);

-- tracks

-- note. the first track is for the first post above
-- note. the next two tracks are for the second post

INSERT INTO tracks (
	postID,
    trackSeq,
	trackTime,
	trackIncr,
	noteCount
) VALUES (
    '423523523',
    '0',
    '2011-02-25 22:27:00',
    '123',
    '123'
);

INSERT INTO tracks (
	postID,
    trackSeq,
	trackTime,
	trackIncr,
	noteCount
) VALUES (
    '23463636',
    '0',
    '2011-06-25 00:27:00',
    '100',
    '100'
);

INSERT INTO tracks (
	postID,
    trackSeq,
	trackTime,
	trackIncr,
	noteCount
) VALUES (
    '23463636',
    '1',
    '2011-06-25 1:27:00',
    '24',
    '124'
);

-- tracks for postOne
INSERT INTO tracks (
	postID,
    trackSeq,
	trackTime,
	trackIncr,
	noteCount
) VALUES (
    '42424141',
    '0',
    '2011-06-25 2:27:00',
    '126',
    '150'
);

INSERT INTO tracks (
	postID,
    trackSeq,
	trackTime,
	trackIncr,
	noteCount
) VALUES (
    '42424141',
    '1',
    '2011-06-25 3:27:00',
    '40',
    '190'
);

INSERT INTO tracks (
	postID,
    trackSeq,
	trackTime,
	trackIncr,
	noteCount
) VALUES (
    '42424141',
    '2',
    '2011-06-25 4:27:00',
    '21',
    '211'
);

INSERT INTO tracks (
	postID,
    trackSeq,
	trackTime,
	trackIncr,
	noteCount
) VALUES (
    '42424141',
    '3',
    '2011-06-25 5:27:00',
    '14',
    '225'
);

INSERT INTO tracks (
	postID,
    trackSeq,
	trackTime,
	trackIncr,
	noteCount
) VALUES (
    '42424141',
    '4',
    '2011-06-25 6:27:00',
    '60',
    '285'
);

INSERT INTO tracks (
	postID,
    trackSeq,
	trackTime,
	trackIncr,
	noteCount
) VALUES (
    '42424141',
    '5',
    '2011-06-25 7:27:00',
    '15',
    '300'
);

-- tracks for postTwo
INSERT INTO tracks (
	postID,
    trackSeq,
	trackTime,
	trackIncr,
	noteCount
) VALUES (
    '22222222',
    '0',
    '2011-06-25 2:27:00',
    '126',
    '150'
);

INSERT INTO tracks (
	postID,
    trackSeq,
	trackTime,
	trackIncr,
	noteCount
) VALUES (
    '22222222',
    '1',
    '2011-06-25 3:27:00',
    '40',
    '190'
);

INSERT INTO tracks (
	postID,
    trackSeq,
	trackTime,
	trackIncr,
	noteCount
) VALUES (
    '22222222',
    '2',
    '2011-06-25 4:27:00',
    '21',
    '211'
);

INSERT INTO tracks (
	postID,
    trackSeq,
	trackTime,
	trackIncr,
	noteCount
) VALUES (
    '22222222',
    '3',
    '2011-06-25 5:27:00',
    '14',
    '225'
);

INSERT INTO tracks (
	postID,
    trackSeq,
	trackTime,
	trackIncr,
	noteCount
) VALUES (
    '22222222',
    '4',
    '2011-06-25 6:27:00',
    '60',
    '285'
);

INSERT INTO tracks (
	postID,
    trackSeq,
	trackTime,
	trackIncr,
	noteCount
) VALUES (
    '22222222',
    '5',
    '2011-06-25 7:27:00',
    '15',
    '300'
);
-- likedPosts for blog 1

INSERT INTO likedPosts (
	blogID,
	postID
) VALUES (
    2,
    '423523523'
);

INSERT INTO likedPosts (
	blogID,
	postID
) VALUES (
    2,
    '23463636'
);

-- LikedPosts for blog 5
INSERT INTO likedPosts (
	blogID,
	postID
) VALUES (
    5,
    '23463636'
);

INSERT INTO likedPosts (
	blogID,
	postID
) VALUES (
    5,
    '423523523'
);

INSERT INTO likedPosts (
	blogID,
	postID
) VALUES (
    5,
    '42424141'
);

INSERT INTO likedPosts (
	blogID,
	postID
) VALUES (
    5,
    '22222222'

);INSERT INTO likedPosts (
	blogID,
	postID
) VALUES (
    5,
    '33333333'
);

-- likedPosts for blog 6
INSERT INTO likedPosts (
	blogID,
	postID
) VALUES (
    6,
    '33333333'
);

INSERT INTO likedPosts (
	blogID,
	postID
) VALUES (
    6,
    '4444444'
);

INSERT INTO likedPosts (
	blogID,
	postID
) VALUES (
    6,
    '5555555'
);

INSERT INTO likedPosts (
	blogID,
	postID
) VALUES (
    6,
    '42424141'
);