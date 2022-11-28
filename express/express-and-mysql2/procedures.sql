CREATE DEFINER=`root`@`localhost` PROCEDURE `curveAddOrEdit`(
IN _id INT,
IN _name VARCHAR(50),
IN _course VARCHAR(45),
IN _duration VARCHAR(50),
IN _age INT
)
BEGIN
IF _id = 0 THEN
INSERT INTO studentBio(id, name, course, duration, age)
VALUES(_id, _name, _course, _duration, _age);
SET _id = LAST_INSERT_ID();
ELSE
UPDATE studentBio
SET
name = _name,
course = _course,
duration = _duration,
age = _age
WHERE id = _id;
END IF;
SELECT _id AS 'id';
END