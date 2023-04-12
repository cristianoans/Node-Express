CREATE SCHEMA IF NOT EXISTS `nodeexpressmysql` DEFAULT CHARACTER SET utf8 ;

USE `nodeexpressmysql`;

CREATE TABLE IF NOT EXISTS `Usuarios` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `NomeCompleto` VARCHAR(255) NOT NULL,
  `Nota1` DECIMAL(4, 2) NOT NULL,
  `Nota2` DECIMAL(4, 2) NOT NULL,
  `Media` DECIMAL(4, 2) NOT NULL,
  `Aprovado` BOOLEAN NOT NULL
);


INSERT INTO `nodeexpressmysql`.`usuarios` (`NomeCompleto`, `Nota1`, `Nota2`, `Media`, `Aprovado`) VALUES ('Cristiano Oliveira',95,95,9.5,1);
INSERT INTO `nodeexpressmysql`.`usuarios` (`NomeCompleto`, `Nota1`, `Nota2`, `Media`, `Aprovado`) VALUES ('Vivianne Silva',10.0,9.0,9.5,1);
INSERT INTO `nodeexpressmysql`.`usuarios` (`NomeCompleto`, `Nota1`, `Nota2`, `Media`, `Aprovado`) VALUES ('José Alves',6.0,9.0,7.5,0);
INSERT INTO `nodeexpressmysql`.`usuarios` (`NomeCompleto`, `Nota1`, `Nota2`, `Media`, `Aprovado`) VALUES ('Vanda Rosa',7.0,9.0,8.0,1);
INSERT INTO `nodeexpressmysql`.`usuarios` (`NomeCompleto`, `Nota1`, `Nota2`, `Media`, `Aprovado`) VALUES ('Karla Oliveira',8.5,8.0,8.25,1);
INSERT INTO `nodeexpressmysql`.`usuarios` (`NomeCompleto`, `Nota1`, `Nota2`, `Media`, `Aprovado`) VALUES ('Keila Oliveira',8.0,9.0,8.5,1);
INSERT INTO `nodeexpressmysql`.`usuarios` (`NomeCompleto`, `Nota1`, `Nota2`, `Media`, `Aprovado`) VALUES ('Juliane Rodrigues',6.5,9.0,7.75,0);
INSERT INTO `nodeexpressmysql`.`usuarios` (`NomeCompleto`, `Nota1`, `Nota2`, `Media`, `Aprovado`) VALUES ('Gustavo Henrique',5.5,6.0,5.75,0);
INSERT INTO `nodeexpressmysql`.`usuarios` (`NomeCompleto`, `Nota1`, `Nota2`, `Media`, `Aprovado`) VALUES ('Beatriz Eduarda',9.8,6.5,8.15,1);
INSERT INTO `nodeexpressmysql`.`usuarios` (`NomeCompleto`, `Nota1`, `Nota2`, `Media`, `Aprovado`) VALUES ('Victoria Oliveira',7.5,8.0,7.75,0);