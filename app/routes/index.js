import express, { query } from "express";
const router = express.Router();
import { db } from "../db.js";


router.get('/courses', async (req, res) => {
    try {
        const query = `SELECT * FROM course ORDER BY course_id`;
        const { rows } = await db.query(query);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/depts/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const query = `SELECT * FROM department WHERE dept_name = $1`;
        const { rows } = await db.query(query, [name]);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/courses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const course = await db.query(`SELECT * FROM course WHERE course_id = $1;`, [id]);
        const depts = await db.query(`SELECT * FROM department;`);
        res.status(200).json({ course: course.rows, depts: depts.rows });
    } catch (err) { res.status(500).send(err.message); }
});

router.post('/courses/save', async (req, res) => {
    console.log(req.body)
    try {
        const { course_id, title, dept_name, credits } = req.body
        const query = `UPDATE course SET title = $1, dept_name = $2, credits  = $3 WHERE course_id = $4 RETURNING *;`
        const result = await db.query(query, [title, dept_name, credits, course_id]);
        const { rows } = await db.query(`SELECT * FROM course ORDER BY course_id`);
        res.status(200).json(rows);
    } catch (err) { res.status(500).send(err.message); }
});

//==================================================================================================================

// SELECT *,  ROUND((CAST(total AS FLOAT) * 100 / CAST(x AS FLOAT))::NUMERIC , 2) Per
/*
SELECT *,  ROUND((CAST(total AS FLOAT) * 100 / CAST(x AS FLOAT))::NUMERIC , 2) Per
FROM (
    SELECT * , (
        SELECT SUM(total)
        FROM (
            SELECT g.grade, COUNT(g.grade) total 
            FROM cmarks m, grade g
            WHERE rid = A.rid
            AND hid = 246
            AND ROUND(marks) BETWEEN g.start AND g.end
            GROUP BY g.grade
        ) B
    ) x
    FROM (
    SELECT rid, g.grade, COUNT(g.grade) total 
    FROM cmarks m, grade g
    WHERE m.rid = 2000
    AND hid = 246
    AND ROUND(marks) BETWEEN g.start AND g.end
    GROUP BY m.rid, g.grade
    ) A
) C
*/



export default router;


