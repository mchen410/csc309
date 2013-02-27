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
	date    	DATETIME, --
	lastSeq		INT, -- don't make this guy reference tracks, because tracks references postID: circular reference
    lastIncr    INT, -- so we can sort by increment
	last_count	INT,
	last_track	DATETIME,
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
	sequence	INT,
	timestamp	DATETIME,
	increment	INT,
	count	INT,
	FOREIGN KEY (postID) REFERENCES posts(postID),
	PRIMARY KEY (postID, sequence)
);

-- sample data
-- sample data
-- sample data

-- blogs

INSERT INTO blogs(blogID, blogName) VALUES(1, 'myawesomeblog.tumblr.com');
INSERT INTO blogs(blogID, blogName) VALUES(2, 'woowah.tumblr.com');
INSERT INTO blogs(blogID, blogName) VALUES(3, 'a.tumblr.com');

-- posts

-- note. both of these posts are liked by blogID=2

INSERT INTO posts (
    postID,
    url,
	text,
	image,
	date,
	lastSeq,
    lastIncr,
	last_count,
	last_track
) VALUES (
    '423523523',
    'asdf.tumblr.com/post/2342323598235879',
    'text for woowah',
    '', -- empty image link
    '2011-02-25 20:27:00 GMT',
    '0', -- only tracking one post in tracks
    '123', -- incremented from 0
    '123',
    '2011-02-25 21:27:00 GMT'
);

INSERT INTO posts (
    postID,
    url,
	text,
	image,
	date,
	lastSeq,
    lastIncr,
	last_count,
	last_track
) VALUES (
    '23463636',
    'another.tumblr.com/post/123123',
    '', -- empty text
    'blah.com/pic.ipeg',
    '2011-02-24 21:27:00 GMT',
    '2',
    '24',
    '124',
    '2011-02-25 22:27:00 GMT'
);

-- tracks

-- note. the first track is for the first post above
-- note. the next two tracks are for the second post

INSERT INTO tracks (
	postID,
    sequence,
	timestamp,
	increment,
	count
) VALUES (
    '423523523',
    '0',
    '2011-02-25 22:27:00 GMT',
    '123',
    '123'
);

INSERT INTO tracks (
	postID,
    sequence,
	timestamp,
	increment,
	count
) VALUES (
    '23463636',
    '0',
    '2011-02-25 21:27:00 GMT',
    '100',
    '100'
);

INSERT INTO tracks (
	postID,
    sequence,
	timestamp,
	increment,
	count
) VALUES (
    '23463636',
    '1',
    '2011-02-25 22:27:00 GMT',
    '24',
    '124'
);

-- likedPosts

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

