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
	

-- -----------------------------------------------------
-- Create a test table. Replace later
-- -----------------------------------------------------