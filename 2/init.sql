CREATE SCHEMA IF NOT EXISTS `csc309h_g1malitm`;
USE `csc309h_g1malitm`;
GRANT ALL ON *.* to 'g1malitm'@'localhost' IDENTIFIED BY 'tahziehe';
FLUSH PRIVILEGES;

-- -----------------------------------------------------
-- Create tables for blogs, user-post relationship, and posts
-- -----------------------------------------------------
DROP TABLE IF EXISTS `usersLikedPost`;
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS users( 
	hostName varchar(124)	PRIMARY KEY 
);
CREATE TABLE IF NOT EXISTS usersLikedPost(
	hostName 	varchar(124),
	post		integer,
	timeLiked	datetime,
	FOREIGN KEY (hostName) REFERENCES users(hostName),
	PRIMARY KEY (hostName, post)
);
	
CREATE TABLE IF NOT EXISTS posts(
	postID 		INT NOT NULL AUTO_INCREMENT,
	URL			varchar(124),
	postText	varchar(500),
	image		varchar(124), -- URL of the image
	postDate	DATETIME,
	PRIMARY KEY (postID)
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
