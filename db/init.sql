-- SCHEMA project
CREATE SCHEMA project;

-- TABLES
CREATE TABLE IF NOT EXISTS project.user (
  usid VARCHAR(8) UNIQUE PRIMARY KEY NOT NULL,
  uname VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
	passwd VARCHAR(50) NOT NULL,
  utype VARCHAR(10),
  coin INT DEFAULT 0,
	roleman VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS project.page (
  usid VARCHAR(8),
	paid VARCHAR(8) PRIMARY KEY NOT NULL,
	ptype VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS project.level (
	usid VARCHAR(8) PRIMARY KEY NOT NULL,
	ltype VARCHAR(10),
	starttime VARCHAR(50),
	expiretime VARCHAR(50),
	expirestamp TIMESTAMP
);

CREATE TABLE IF NOT EXISTS project.content (
	paid VARCHAR(8),
	coid VARCHAR(8) PRIMARY KEY NOT NULL,
	createtime TIMESTAMP,
	label VARCHAR(50),
	docs VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS project.friend (
	usid VARCHAR(8),
	frid VARCHAR(8),
	maketime VARCHAR(50),
	PRIMARY KEY(usid, frid)
);

-- CREATE VIEW
-- CREATE VIEW todo.ttodo AS
-- 	SELECT id, task, complete
-- 		FROM todo.rtodo;
