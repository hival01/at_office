
truncate table languages;

use job_application;
select * from basic_details;
select * from education;
select * from work_experience;
select * from languages;	
select * from applicant_language;
select * from technologies;
select * from applicant_technologies;
select * from preferences;
select * from locations;
select * from departments;

insert into locations (location_name ) values ("Ahmedabad") , ("Surat")  , ("Gandhinagar")  , ("Rajkot");
insert into departments (department_name) values ("Frontend Development") , ("Backend Development") , ("Full Stack Development") , ("QA Testing") , ("HR");
desc applicant_technologies;


delete from work_experience where work_exp_id >0;
delete from education where applicant_id >0;
delete from basic_details where applicant_id>0;
create table users(
	user_id int primary key auto_increment,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    phone_no varchar(10) not null,
    email varchar(30) not null,
    address text not null,
    city enum ('surat' , 'ahmedabad', 'gandhinagar', 'navsari')
);
insert into users values(1,"hival" ,"patel" , "1111111111" , "hival@gmail.com " , "bhadol , surat , gujarat , 394540" , "surat" ,'male' );
select* from users;

alter table users
modify column phone_no varchar(20);

truncate table users;

SHOW VARIABLES LIKE "secure_file_priv";

LOAD DATA LOCAL INFILE '/home/hival-patel/Downloads/users.csv' into table users
fields terminated by ','
enclosed by '"'
lines terminated by '\n'
ignore 1 rows
(first_name,last_name,phone_no,email,address,city,gender);

SHOW VARIABLES LIKE 'local_infile';
SET GLOBAL local_infile = 1;



LOAD DATA LOCAL INFILE '/home/hival-patel/Downloads/users.csv'
INTO TABLE users
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(first_name,last_name,phone_no,email,address,city);

SHOW VARIABLES LIKE 'secure_file_priv';


LOAD DATA INFILE '/var/lib/mysql-files/users.csv'
INTO TABLE users
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(first_name,last_name,phone_no,email,address,city,gender);

describe table users;
show tables;
select * from users;


LOAD DATA INFILE '/var/lib/mysql-files/users.csv'
INTO TABLE users
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(@id, first_name, last_name, phone_no, email, address, city, gender);

ALTER TABLE users MODIFY email varchar(50);
ALTER TABLE users MODIFY city VARCHAR(20);


LOAD DATA INFILE '/var/lib/mysql-files/users.csv'
INTO TABLE users
FIELDS TERMINATED BY '\t'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(@id, first_name, last_name, phone_no, email, address, city, gender);
truncate table users;





LOAD DATA INFILE '/var/lib/mysql-files/users.csv'
INTO TABLE users
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(@id, first_name, last_name, phone_no, email, address, @city, @gender)
SET 
city = TRIM(@city),
gender = TRIM(@gender);

select * from users;

truncate table users;