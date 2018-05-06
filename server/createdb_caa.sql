CREATE TABLE IF NOT EXISTS Map (
    id INTEGER,
    name VARCHAR(255),
    game VARCHAR(255) DEFAULT "Counter-Strike 1.6",
    game INT,
    type VARCHAR(255),
    difficulty VARCHAR(255),
    length VARCHAR(255),
    progress INT(3),
    status VARCHAR(255),
    releaseDate DATE DEFAULT(DATE('now')),
    download TEXT NULL,
    description TEXT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (game) REFERENCES Game (id)
);

CREATE TABLE IF NOT EXISTS Game (
    id INTEGER,
    name VARCHAR(255),

    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS MapType (
    id INTEGER,
    name VARCHAR(255),

    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS MapIsType (
    map_id INT,
    type_id INT,

    PRIMARY KEY (map_id, type_id),
    FOREIGN KEY (map_id) REFERENCES Map (id) ON DELETE CASCADE,
    FOREIGN KEY (type_id) REFERENCES MapType (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Image (
    id INTEGER,
    location VARCHAR(255),
    map_id INT,

    PRIMARY KEY (id),
    FOREIGN KEY (map_id) REFERENCES Map (id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS ContactMessage (
    id INTEGER,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    recieved INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Changelog (
    id INTEGER,
    type INT,
    description TEXT,
    timeLogged INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    FOREIGN KEY (type) REFERENCES ChangelogType (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ChangelogType (
    id INTEGER,
    name INT,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS MapHasChangelog (
    map_id INT,
    changelog_id INT,

    PRIMARY KEY (map_id, type_id),
    FOREIGN KEY (map_id) REFERENCES Map (id) ON DELETE CASCADE,
    FOREIGN KEY (changelog_id) REFERENCES Changelog (id) ON DELETE CASCADE
);

INSERT INTO Map (name, game, type, status, info, releaseDate) VALUES
    ("kz_ea_spiral", "Counter Strike 1.6", "Climb", "Released", NULL, "2005-09-12"),
    ("kz_junglemountain", "Counter Strike 1.6", "Climb", "Released", NULL, "2005-10-02"),
    ("kz_hopez", "Counter Strike 1.6", "Climb", "Released", NULL, "2005-10-08"),

INSERT INTO Image (location, map_id) VALUES
    ("1.jpg", 1),
    ("2.png", 2),
    ("3.png", 3),
    ("4.JPG", 4);

INSERT INTO Game (name) VALUES
    ("Counter-Strike 1.6"),
    ("Kreedz Climbing");

INSERT INTO MapType (name) VALUES
    ("Climb"),
    ("Bhop"),
    ("Longjump");

INSERT INTO MapIsType (map_id, type_id) VALUES
    (1, 1),
    (2, 1),
    (3, 2);

UPDATE Map SET difficulty=NULL WHERE difficulty='NULL';
UPDATE Map SET difficulty=NULL WHERE difficulty='NULL';


.mode csv
.import maps.csv Map
