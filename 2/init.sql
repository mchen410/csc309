CREATE SCHEMA IF NOT EXISTS `csc309h_g1malitm`;
USE `csc309h_g1malitm`;
GRANT ALL ON *.* to 'g1malitm'@'localhost' IDENTIFIED BY 'tahziehe';
FLUSH PRIVILEGES;

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
	postID 		INT NOT NULL AUTO_INCREMENT,
	URL			varchar(124),
	postText	varchar(500),
	image		varchar(124), -- URL of the image
	postDate	DATETIME,
	PRIMARY KEY (postID)
);

CREATE TABLE IF NOT EXISTS likedPosts(
	blogID	 	integer,
	postID		integer,
	timeLiked	datetime,
	FOREIGN KEY (blogID) REFERENCES blogs(blogID),
	FOREIGN KEY (postID) REFERENCES posts(postID),
	PRIMARY KEY (blogID, postID)
);

CREATE TABLE IF NOT EXISTS tracks(
	postID		INT,
	sequence	INT,
	trackTime	DATETIME,
	difference	INT,
	nodeCount	INT,
	FOREIGN KEY (postID) REFERENCES posts(postID),
	PRIMARY KEY (postID, trackTime)
);

-- -----------------------------------------------------
-- Create a test table. Replace later
-- -----------------------------------------------------
