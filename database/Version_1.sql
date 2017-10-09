SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `PLAYER`;
DROP TABLE IF EXISTS `TEAM`;
DROP TABLE IF EXISTS `GAME`;
DROP TABLE IF EXISTS `TOURNEY`;
DROP TABLE IF EXISTS `TEAM_PLAYERS`;
DROP TABLE IF EXISTS `TOURNEY_TEAMS`;
DROP TABLE IF EXISTS `GAME_CONVERSION`;
DROP TABLE IF EXISTS `Entity1`;
DROP TABLE IF EXISTS `GAME_CONV`;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE `PLAYER` (
    `id` INTEGER NOT NULL,
    `tag` VARCHAR(32),
    `first_name` VARCHAR(64),
    `last_name` VARCHAR(64),
    `role` VARCHAR(16),
    `hometeown` VARCHAR(32),
    `image_url` VARCHAR(255),
    `current_team` INTEGER,
    `current_game` INTEGER NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE (`id`)
);

CREATE TABLE `TEAM` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(64),
    `acronym` VARCHAR(16),
    `image_url` VARCHAR(255),
    `players` JSON,
    `current_players` INTEGER,
    `current_game` INTEGER NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE (`id`)
);

CREATE TABLE `GAME` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(255),
    `developers` JSON,
    `genres` JSON,
    `release_date` DATE,
    `website` VARCHAR(255),
    `screenshots` JSON,
    PRIMARY KEY (`id`),
    UNIQUE (`id`)
);

CREATE TABLE `TOURNEY` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(255),
    `slug` VARCHAR(128),
    `begin_at` DATETIME,
    `end_at` DATETIME,
    `teams` INTEGER,
    `game` INTEGER NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE (`id`)
);

CREATE TABLE `TEAM_PLAYERS` (
    `id` INTEGER NOT NULL,
    `team_id` INTEGER NOT NULL,
    `player_id` INTEGER NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE (`id`)
);

CREATE TABLE `TOURNEY_TEAMS` (
    `id` INTEGER NOT NULL,
    `tourney_id` INTEGER NOT NULL,
    `team_id` INTEGER NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `GAME_CONV` (
    `igdb_id` INTEGER NOT NULL,
    `panda_id` INTEGER NOT NULL,
    PRIMARY KEY (`igdb_id`, `panda_id`)
);

ALTER TABLE `PLAYER` ADD FOREIGN KEY (`current_team`) REFERENCES `TEAM`(`id`);
ALTER TABLE `PLAYER` ADD FOREIGN KEY (`current_game`) REFERENCES `GAME`(`id`);
ALTER TABLE `TEAM` ADD FOREIGN KEY (`current_game`) REFERENCES `GAME`(`id`);
ALTER TABLE `TEAM` ADD FOREIGN KEY (`current_players`) REFERENCES `TEAM_PLAYERS`(`id`);
ALTER TABLE `TOURNEY` ADD FOREIGN KEY (`game`) REFERENCES `GAME`(`id`);
ALTER TABLE `TOURNEY` ADD FOREIGN KEY (`teams`) REFERENCES `TOURNEY_TEAMS`(`id`);
ALTER TABLE `TEAM_PLAYERS` ADD FOREIGN KEY (`player_id`) REFERENCES `PLAYER`(`id`);
ALTER TABLE `TEAM_PLAYERS` ADD FOREIGN KEY (`team_id`) REFERENCES `TEAM`(`id`);
ALTER TABLE `TOURNEY_TEAMS` ADD FOREIGN KEY (`tourney_id`) REFERENCES `TOURNEY`(`id`);
ALTER TABLE `TOURNEY_TEAMS` ADD FOREIGN KEY (`team_id`) REFERENCES `TEAM`(`id`);
