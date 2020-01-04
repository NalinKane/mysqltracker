DROP DATABASE IF EXISTS company;

CREATE DATABASE
IF NOT EXISTS company;

USE company;

DROP 
  TABLE IF EXISTS department;
CREATE TABLE
IF NOT EXISTS department
(
  id INT
(11) NOT NULL auto_increment, 
  name VARCHAR
(30) NOT NULL, 
  PRIMARY KEY
(id)
);
DROP 
  TABLE IF EXISTS role;
CREATE TABLE
IF NOT EXISTS role
(
  id INT
(11) NOT NULL auto_increment, 
  department_id INT
(11), 
  title VARCHAR
(30) NOT NULL, 
  salary DECIMAL
(10.0) NOT NULL, 
  PRIMARY KEY
(id), 
  FOREIGN KEY
(department_id) REFERENCES department
(id)
);

DROP TABLE IF EXISTS employee;

CREATE TABLE
IF NOT EXISTS employee
( 
     id         INT
(11) NOT NULL auto_increment, 
     first_name VARCHAR
(30) NOT NULL, 
     last_name  VARCHAR
(30) NOT NULL, 
     role_id    INT
(11), 
     manager_id INT
(11) REFERENCES employee
(id), 
     PRIMARY KEY
(id), 
     FOREIGN KEY
(role_id) REFERENCES role
(id) 
  ); 
  

        
             