import pg from "pg";
const { Pool } = pg;
import 'dotenv/config';

// export const db = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false,
//     },
// });

// export const db = new Pool({
//     user: "demo",
//     host: "localhost",
//     database: "demo",
//     password: "demo@428",
//     port: 5432,
//     //options: "-c search_path=exams",
// });

export const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    //options: "-c search_path=exams",
});

