DROP DATABASE IF EXISTS bike;

CREATE DATABASE bike;

USE bike;

CREATE TABLE users (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email varchar(40) NOT NULL,
  familyName varchar(40) NOT NULL,
  givenName varchar(40) NOT NULL,
  fullName varchar(40) NOT NULL,
  googleId varchar(40) NOT NULL,
  picture varchar(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE landmarks (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    kind varchar (40),
    details varchar(200),
    userId int,
    fullName varchar(40),
    lat varchar(40),
    lng varchar(40),
    date_id DATE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE events (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  eventsName varchar(40),
  hostName varchar(40), 
  details varchar(200),
  date_id DATE,
  time_id TIME,
  lat varchar(40),
  lng varchar(40),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE rsvps (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  userId int,
  FOREIGN KEY (userId) REFERENCES users(id),
  eventId int,
  FOREIGN KEY (eventId) REFERENCES events(id),
  fullName varchar(40),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);