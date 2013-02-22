CREATE SCHEMA IF NOT EXISTS `csc309h_g1malitm`; 
USE `csc309h_g1malitm`;
GRANT ALL ON *.* to 'g1malitm'@'localhost' IDENTIFIED BY 'tahziehe';
FLUSH PRIVILEGES;

-- -----------------------------------------------------
-- Create tables for blogs, user-post relationship, and posts
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Create a test table. Replace later
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS blogs( name varchar(124) );
INSERT INTO blogs VALUES('myBlog');
INSERT INTO blogs VALUES('yourBlog');