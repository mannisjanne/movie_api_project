import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Lataa ympäristömuuttujat .env-tiedostosta
const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
});

export { pool }; // Huom: Käytetään named exportia