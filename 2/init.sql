CREATE SCHEMA IF NOT EXISTS `csc309h_g1malitm`; 
USE `csc309h_g1malitm`;
CREATE USER IF NOT EXISTS 'g1malitm'@'localhost' IDENTIFIED BY 'tahziehe';
GRANT ALL PRIVILEGES ON *.* TO 'g1malitm'@'localhost';
FLUSH PRIVILEGES;

-- -----------------------------------------------------
-- Create tables for blogs, user-post relationship, and posts
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Create a test table. Replace later
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS blogs( name varchar(124) );
INSERT INTO blogs VALUES('myBlog');