## SELECT Clause

```sql
SELECT name		
FROM instructor;
```

```sql
SELECT DISTINCT dept_name	
FROM instructor;
```

```sql
SELECT all dept_name	
FROM instructor;
```
```sql
SELECT *		
FROM instructor;

SELECT  '437';

SELECT '437' AS FOO;

SELECT  'A'		
FROM instructor;

```
```sql
SELECT ID, name, salary/12
FROM instructor;

SELECT ID, name, salary/12  AS monthly_salary
FROM instructor;
```
## The WHERE Clause
```sql
SELECT name	
FROM instructor	
WHERE dept_name = 'Comp. Sci.';

SELECT name 
FROM instructor 
WHERE dept_name = 'Comp. Sci.' AND salary > 70000;
```
## The FROM Clause
Find the Cartesian product instructor X teaches

```sql
SELECT *		
FROM instructor, teaches;
```
#### <span style="color: DodgerBlue ">Examples</span>
```sql
SELECT name, course_id
FROM instructor , teaches
WHERE instructor.ID = teaches.ID; 

SELECT name, course_id
FROM instructor , teaches
WHERE instructor.ID = teaches.ID 
          AND  instructor. dept_name = 'Art';
```
## The Rename Operation
```sql
SELECT DISTINCT T.name 
FROM instructor AS T, instructor AS S 
WHERE T.salary > S.salary AND S.dept_name = 'Comp. Sci.’;
```
## Ordering the Display of Tuples
```sql
SELECT DISTINCT name FROM instructor order by name;
SELECT DISTINCT name FROM instructor order by name DESC;
SELECT DISTINCT name FROM instructor order by dept_name, name;
```
## WHERE Clause Predicates
SQL includes a `between` comparison operator
```sql
SELECT name 
FROM instructor 
WHERE salary between 90000 AND 100000;
```
Tuple comparison
```sql
SELECT name, course_id 
FROM instructor, teaches 
WHERE (instructor.ID, dept_name) = (teaches.ID, 'Biology');
```
## Set Operations

Find courses that ran in Fall 2009 or in Spring 2010
```sql
(SELECT course_id  FROM section WHERE semester = 'Fall' AND year = 2009)           
union           
(SELECT course_id  FROM section WHERE semester = 'Spring' AND year = 2010);
```          

Find courses that ran in Fall 2009 AND in Spring 2010

```sql
(SELECT course_id  FROM section WHERE semester = 'Fall' AND year = 2009)           
intersect           
(SELECT course_id  FROM section WHERE semester = 'Spring' AND year = 2010);
```
Find courses that ran in Fall 2009 but not in Spring 2010
```sql
(SELECT course_id  FROM section WHERE semester = 'Fall' AND year = 2009)           
except           
(SELECT course_id  FROM section WHERE semester = 'Spring' AND year = 2010);
```
## Null Values

```sql
SELECT name FROM instructor WHERE salary is null;
SELECT name FROM instructor WHERE salary is not null;
```
## Aggregate Functions 
```sql
SELECT avg (salary) 
FROM instructor 
WHERE dept_name= 'Comp. Sci.';

SELECT count (DISTINCT ID)
FROM teaches
WHERE semester = 'Spring' AND year = 2010;

SELECT count (*)
FROM course;
```
## Aggregate Functions – Group By
```sql
SELECT dept_name, avg (salary) AS avg_salary
FROM instructor
group by dept_name;
```
## Aggregate Functions – Having Clause

```sql
SELECT dept_name, AVG(salary) AS avg_salary
FROM instructor
GROUP BY dept_name
HAVING AVG(salary) > 42000;
```
# <span style="color: Maroon">Lecture 4</span>
## JOIN
#### <span style="color: DodgerBlue">Equi / Inner </span>
```sql
SELECT name, course_id
FROM  student, takes
WHERE student.ID = takes.ID;
```
#### <span style="color: DodgerBlue">NATURAL</span>
```sql
SELECT name, course_id
FROM student NATURAL JOIN takes;

SELECT name, title        
FROM student NATURAL JOIN takes, course       
WHERE takes.course_id = course.course_id;

select name, title
FROM (student NATURAL JOIN takes) JOIN course USING (course_id);
```
## JOIN Condition
```sql
select * 
FROM student JOIN takes 
ON student.ID = takes.ID;

select *
FROM student, takes
WHERE student.ID = takes.ID;
```

## Left OUTER JOIN

```sql
SELECT * FROM course NATURAL LEFT OUTER JOIN prereq;
SELECT * FROM course NATURAL RIGHT OUTER JOIN prereq;
SELECT * FROM course NATURAL FULL OUTER JOIN prereq;
```

## Joined Relations – Examples 
```sql
SELECT * 
FROM course INNER JOIN prereq 
ON course.course_id = prereq.course_id;

SELECT * 
FROM course LEFT OUTER JOIN prereq 
ON course.course_id = prereq.course_id;

SELECT * FROM course NATURAL RIGHT OUTER JOIN prereq;

SELECT * FROM course FULL OUTER JOIN prereq USING (course_id);
```
