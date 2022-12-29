create database theCurveDB;
use theCurveDB;
drop database theCurveDB;
create table studentBio(
id int not null auto_increment,
name varchar(50) not null, 
course varchar(45) not null, 
duration varchar(50) not null, 
age int not null,
primary key(id)
);

insert into studentBio(name, course, duration, age)
values("ubani", "backend", "5 months", 45),
("ifeanyi", "backend", "5 months", 45);

select * from studentBio;

delete from studentBio
where id = 4;

drop database dummy;
