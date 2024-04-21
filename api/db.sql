CREATE DATABASE IF NOT EXISTS uevent;
CREATE USER IF NOT EXISTS 'dharin'@'localhost' IDENTIFIED BY 'securepass';
GRANT ALL PRIVILEGES ON uevent.* TO 'dharin'@'localhost';

USE uevent;

CREATE TABLE IF NOT EXISTS users(
                            id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
                            login VARCHAR(30) NOT NULL UNIQUE,
                            password VARCHAR(255) NOT NULL,
                            full_name VARCHAR(255) NOT NULL,
                            email VARCHAR(255) NOT NULL UNIQUE,
                            picture VARCHAR(255) NOT NULL DEFAULT 'default_avatar.png',
                            is_confirmed BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS companies(
                            id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
                            name VARCHAR(255) NOT NULL UNIQUE,
                            email VARCHAR(255) NOT NULL UNIQUE,
                            latitude DECIMAL(7, 5) NOT NULL,
                            longitude DECIMAL(7, 5) NOT NULL,
                            picture_path VARCHAR(255) NOT NULL DEFAULT 'default_company_avatar.png',
                            user_id INTEGER NOT NULL,


                            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS events(
                            id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
                            name VARCHAR(255) NOT NULL,
                            description TEXT NOT NULL,
                            date TIMESTAMP NOT NULL,
                            price INTEGER NOT NULL,
                            tickets_available INTEGER NOT NULL,
                            latitude DECIMAL(7, 5) NOT NULL,
                            longitude DECIMAL(7, 5) NOT NULL,
                            picture VARCHAR(255) NOT NULL DEFAULT 'default_event_avatar.png',
                            company_id INTEGER NOT NULL,
                            format_id INTEGER NOT NULL,
                            theme_id INTEGER NOT NULL,


                            FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE ON UPDATE CASCADE,
                            FOREIGN KEY (format_id) REFERENCES formats(id) ON DELETE RESTRICT ON UPDATE CASCADE,
                            FOREIGN KEY (theme_id) REFERENCES themes(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS promo_codes(
                            id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
                            code VARCHAR(30) NOT NULL,
                            discount INTEGER NOT NULL,
                            event_id INTEGER NOT NULL,


                            FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS comments(
                            id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
                            content TEXT NOT NULL,
                            date TIMESTAMP(1) NOT NULL DEFAULT CURRENT_TIMESTAMP(1),
                            user_id INTEGER NOT NULL,
                            event_id INTEGER NOT NULL,


                            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
                            FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS user_events(
                            user_id INTEGER NOT NULL,
                            event_id INTEGER NOT NULL,


                            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
                            FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS formats(
                            id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
                            name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS themes(
                            id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
                            name VARCHAR(255) NOT NULL
);