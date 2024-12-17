import express from 'express';
import { pool } from './pg_connection.js'; // Tuodaan tietokantayhteys

const app = express();
app.use(express.json()); // Mahdollistaa req.body:n lukemisen POST-pyynnöissä

// Portin kuuntelu
app.listen(3001, () => {
    console.log('Server running in port 3001');
});

// ===== Genres =====
// Hae kaikki genret
app.get('/genres', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Genre');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Lisää genre
app.post('/genres', async (req, res) => {
    const { name } = req.body;
    try {
        const query = 'INSERT INTO Genre (name) VALUES ($1) RETURNING *';
        const result = await pool.query(query, [name]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ===== Movies =====
// Hae kaikki elokuvat ja niiden genret
app.get('/movies', async (req, res) => {
    try {
        const query = `
            SELECT Movie.movie_id, Movie.title, Movie.release_year, Genre.name AS genre
            FROM Movie
            LEFT JOIN Genre ON Movie.genre_id = Genre.genre_id
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Lisää uusi elokuva
app.post('/movies', async (req, res) => {
    const { title, release_year, genre_id } = req.body;
    try {
        const query = `
            INSERT INTO Movie (title, release_year, genre_id)
            VALUES ($1, $2, $3) RETURNING *;
        `;
        const values = [title, release_year, genre_id];
        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ===== Users =====
// Hae kaikki käyttäjät
app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT user_id, username, email FROM Users');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Lisää käyttäjä
app.post('/users', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const query = `
            INSERT INTO Users (username, email, password)
            VALUES ($1, $2, $3) RETURNING user_id, username, email;
        `;
        const values = [username, email, password];
        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ===== Reviews =====
// Hae kaikki arvostelut
app.get('/reviews', async (req, res) => {
    try {
        const query = `
            SELECT Review.review_id, Review.rating, Review.comment, 
                   Movie.title AS movie_title, Users.username AS reviewer
            FROM Review
            JOIN Movie ON Review.movie_id = Movie.movie_id
            JOIN Users ON Review.user_id = Users.user_id
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Lisää arvostelu
app.post('/reviews', async (req, res) => {
    const { rating, comment, movie_id, user_id } = req.body;
    try {
        const query = `
            INSERT INTO Review (rating, comment, movie_id, user_id)
            VALUES ($1, $2, $3, $4) RETURNING *;
        `;
        const values = [rating, comment, movie_id, user_id];
        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ===== Favorites =====
// Hae suosikit
app.get('/favorites', async (req, res) => {
    try {
        const query = `
            SELECT Favorite.favorite_id, Movie.title AS movie_title, Users.username AS user
            FROM Favorite
            JOIN Movie ON Favorite.movie_id = Movie.movie_id
            JOIN Users ON Favorite.user_id = Users.user_id
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Lisää suosikki
app.post('/favorites', async (req, res) => {
    const { movie_id, user_id } = req.body;
    try {
        const query = `
            INSERT INTO Favorite (movie_id, user_id)
            VALUES ($1, $2) RETURNING *;
        `;
        const values = [movie_id, user_id];
        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});