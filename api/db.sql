CREATE DATABASE IF NOT EXISTS uevent;
CREATE USER IF NOT EXISTS 'dharin'@'localhost' IDENTIFIED BY 'securepass';
GRANT ALL PRIVILEGES ON uevent.* TO 'dharin'@'localhost';

USE uevent;

CREATE TABLE IF NOT EXISTS users (
                            id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
                            login VARCHAR(30) NOT NULL UNIQUE,
                            password VARCHAR(255) NOT NULL,
                            full_name VARCHAR(255) NOT NULL,
                            email VARCHAR(255) NOT NULL UNIQUE,
                            picture VARCHAR(255) NOT NULL DEFAULT '/avatars/default_avatar.png',
                            is_confirmed BOOLEAN NOT NULL DEFAULT false
);

