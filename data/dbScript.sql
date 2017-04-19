CREATE DATABASE cashkeeper;

 CREATE TABLE cashkeeper.user (
  name VARCHAR (50) NOT NULL,
  mail VARCHAR(50) NOT NULL PRIMARY KEY,
  passwrd VARCHAR(500) NOT NULL,
  datebirth DATE,
  gender VARCHAR(1),
  country VARCHAR(50),
  state VARCHAR(50),
  city VARCHAR(50)
 );

  CREATE TABLE cashkeeper.dataentry (
    mail varchar(50) NOT NULL,
    amount int NOT NULL,
    type varchar(30) NOT NULL,
    category varchar(50) NOT NULL,
    entryId int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    description varchar(250),
    FOREIGN KEY(mail) REFERENCES cashkeeper.user(mail)
 );
