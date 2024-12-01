import dotenv from 'dotenv';
import pg from 'pg';
dotenv.config();

const pgPool = new pg.Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
});

export {pgPool};