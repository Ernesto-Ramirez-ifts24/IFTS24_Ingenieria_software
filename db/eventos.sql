CREATE TABLE `eventos`(
    `id` int(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `nombre_lugar` varchar(50) NOT NULL,
    `fecha` date NOT NULL UNIQUE
    ) ENGINE = INNODB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO `eventos` ( `nombre_lugar`, `fecha`) VALUES ()