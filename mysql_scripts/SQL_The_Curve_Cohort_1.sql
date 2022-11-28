/* 
SQL CLASS FOR THE CURVE COHORT 1
INSTRUCTOR: UBANI FRIDAY
NUMBER OF STUDENTS: 11
*/

-- creata a database
CREATE DATABASE studentDB;

-- Activate the database
USE studentDB;

-- drop database
DROP DATABASE studentDB;


-- create a table
CREATE TABLE studentRecords(
id INT NOT NULL AUTO_INCREMENT,
studentName VARCHAR(255) NOT NULL,
studentCourse VARCHAR(255) NOT NULL,
studentDuration VARCHAR(255) NOT NULL,
PRIMARY KEY(id)
);

-- add new column
ALTER TABLE studentRecords
ADD studentAge INT NOT NULL;

-- drop table
DROP TABLE studentRecords;

-- insert records to a table
INSERT INTO studentRecords(studentName, studentCourse, studentDuration, studentAge)
VALUES('Favour', 'Backend', '5 Months', 17);

INSERT INTO studentRecords(studentName, studentCourse, studentDuration, studentAge)
VALUES('Favour', 'Frontend', '5 Months', 56);

-- add record to table
INSERT INTO studentRecords(studentName, studentCourse, studentDuration, studentAge)
VALUES('Chisom', 'Backend', '5 Months', 20),
('Destiny', 'Backend', '5 Months', 21),
('Anthony', 'Backend', '5 Months', 17),
('Joshua', 'Backend', '5 Months', 18),
('Ferdinand', 'Backend', '5 Months', 18),
('Isaac', 'Backend', '5 Months', 35),
('Lucia', 'Backend', '5 Months', 15);


/* 
CLAUSES is SQL is generarally seen as conditionals in higher level programming languages 
USES OF CLAUSE
- allows us to applly constraint on data
- helps us to reduce complexity of query
- allows us to restrict output values
- helps in writing user friendly queries that is easy to read and understansd.
*/
-- SELECT CLAUS: show records in a table
-- show all record
SELECT * FROM studentRecords;

-- Show record of a single column
SELECT studentName FROM studentRecords;

-- show multiple records
SELECT studentName, studentAge FROM studentRecords;

-- WHERE CLAUSE: allows us to apply constraints on the query output.
SELECT * FROM studentRecords
WHERE studentAge < 20;

-- UPDATE CLAUSE: Allows us to update the records present in our database.
UPDATE studentRecords
SET studentName = 'Ubani'
WHERE id = 2;

-- DELETE CLAUSE: allows us to remove record from our database.
DELETE FROM studentRecords
WHERE id=2;

-- ORDER BY CLAUSE: Allows us to explicitly decide the order of the output of our query.
-- Ascending order
SELECT studentName, studentCourse FROM studentRecords
ORDER BY studentName ASC;

-- Descending order
SELECT studentName, studentCourse FROM studentRecords
ORDER BY studentName DESC;

-- LIMIT CLAUSE: Helps us to limit the number of results from the query we run on our database.
-- show limited records
SELECT * FROM studentRecords LIMIT 5;

-- LIKE CLAUSE: It allows us to get the output’s which match the exact expressions or patterns as required by us.
-- gets all column records having the letter "s".
SELECT * FROM studentRecords
WHERE studentName LIKE '%s%';

-- gets all column records start with the letter "s".
SELECT * FROM studentRecords
WHERE studentName LIKE 's%';

-- gets all column records ending the letter "s".
SELECT * FROM studentRecords
WHERE studentName LIKE '%s';


-- AND CLAUSE: like the OR clause, it allows us to show records that matches one out of two conditions
SELECT * FROM studentRecords
WHERE studentAge > 17 AND studentAge < 30;

-- OR CLAUSE:  allows us to show records that matches two conditions
SELECT * FROM studentRecords
WHERE studentAge > 17 OR studentAge < 30;

-- AS CLAUSE: allow us to give a precise name to any collumn.
SELECT studentName AS 'Name', studentAge AS 'Age' FROM studentRecords;

-- DISTINCT CLAUSE: helps to remove duplicate records.
SELECT DISTINCT studentCourse FROM studentRecords;

-- BETWEEN CLAUSE: allows us to display table records within a given range.
SELECT * FROM studentRecords
WHERE studentAge BETWEEN 20 AND 28;

-- AGGREGATE FUNCTIONS
-- MIN(): It allows us to show the smallest value from a particular table column.
SELECT MIN(studentAge) AS youngestStudent
FROM studentRecords;

-- MAX(): It allows us to show the highest value from a particular table column.
SELECT MAX(studentAge) AS oldestStudent
FROM studentRecords;

-- COUNT(): displays the number of existence without duplicate from a creterion.
SELECT COUNT(studentAge)
FROM studentRecords;

-- AVG(): It allows us to display the average value of a numeric column.
SELECT AVG(studentAge)
FROM studentRecords; 

-- AVG(): It allows us to display the total value of a numeric column.
SELECT SUM(studentAge)
FROM studentRecords;



