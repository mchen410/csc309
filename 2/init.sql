CREATE SCHEMA IF NOT EXISTS `csc309h_g1malitm`;
USE `csc309h_g1malitm`;
-- can only create a user once. no create user if not exists syntax:
-- CREATE USER 'g1malitm'@'localhost' IDENTIFIED BY 'tahziehe';
-- GRANT ALL PRIVILEGES ON *.* TO 'g1malitm'@'localhost';
-- FLUSH PRIVILEGES;

-- -----------------------------------------------------
-- Create tables for blogs, user-post relationship, and posts
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Create a test table. Replace later
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS blogs( name varchar(124) );
INSERT INTO blogs VALUES('myBlog');