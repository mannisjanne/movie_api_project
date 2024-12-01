import { pgPool } from "./pg_connection.js";

makeQuery();

async function makeQuery() {
    try{
        await pgPool.query("INSERT INTO genre (genre_id, genre_name) VALUES ('5', 'Horror')");
    }catch(err){
            console.log(err.message);
        }
    }