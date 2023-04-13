CREATE SCHEMA IF NOT EXISTS `nodeexpressmysql` DEFAULT CHARACTER SET utf8 ;

USE `nodeexpressmysql`;

CREATE TABLE IF NOT EXISTS `Usuarios` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `matricula` VARCHAR(20) UNIQUE NOT NULL,
  `NomeCompleto` VARCHAR(255) NOT NULL,
  `Nota1` DECIMAL(4, 2) NOT NULL,
  `Nota2` DECIMAL(4, 2) NOT NULL,
  `Media` DECIMAL(4, 2) NOT NULL,
  `Aprovado` BOOLEAN NOT NULL
);


INSERT INTO `nodeexpressmysql`.`usuarios` (`Matricula`, `NomeCompleto`, `Nota1`, `Nota2`, `Media`, `Aprovado`) VALUES ('01012023','Vivianne Silva',10.0,9.0,9.5,1);
INSERT INTO `nodeexpressmysql`.`usuarios` (`Matricula`, `NomeCompleto`, `Nota1`, `Nota2`, `Media`, `Aprovado`) VALUES ('02012023','José Alves',6.0,9.0,7.5,0);
INSERT INTO `nodeexpressmysql`.`usuarios` (`Matricula`, `NomeCompleto`, `Nota1`, `Nota2`, `Media`, `Aprovado`) VALUES ('03012023','Vanda Rosa',7.0,9.0,8.0,1);
INSERT INTO `nodeexpressmysql`.`usuarios` (`Matricula`, `NomeCompleto`, `Nota1`, `Nota2`, `Media`, `Aprovado`) VALUES ('04012023','Karla Oliveira',8.5,8.0,8.25,1);
INSERT INTO `nodeexpressmysql`.`usuarios` (`Matricula`, `NomeCompleto`, `Nota1`, `Nota2`, `Media`, `Aprovado`) VALUES ('05012023','Keila Oliveira',8.0,9.0,8.5,1);
INSERT INTO `nodeexpressmysql`.`usuarios` (`Matricula`, `NomeCompleto`, `Nota1`, `Nota2`, `Media`, `Aprovado`) VALUES ('06012023','Juliane Rodrigues',6.5,9.0,7.75,0);
INSERT INTO `nodeexpressmysql`.`usuarios` (`Matricula`, `NomeCompleto`, `Nota1`, `Nota2`, `Media`, `Aprovado`) VALUES ('07012023','Gustavo Henrique',5.5,6.0,5.75,0);
INSERT INTO `nodeexpressmysql`.`usuarios` (`Matricula`, `NomeCompleto`, `Nota1`, `Nota2`, `Media`, `Aprovado`) VALUES ('08012023','Beatriz Eduarda',9.8,6.5,8.15,1);
INSERT INTO `nodeexpressmysql`.`usuarios` (`Matricula`, `NomeCompleto`, `Nota1`, `Nota2`, `Media`, `Aprovado`) VALUES ('09012023','Victoria Oliveira',7.5,8.0,7.75,0);
INSERT INTO `nodeexpressmysql`.`usuarios` (`Matricula`, `NomeCompleto`, `Nota1`, `Nota2`, `Media`, `Aprovado`) VALUES ('10012023','Cristiano Oliveira',10.0,10.0,10.0,1);
