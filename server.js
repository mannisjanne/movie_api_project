import express from 'express';

const app = express();

app.listen(3001, () => {
    console.log('Server running in port 3001');
});

app.get('/', (req, res) => res.send('Hello world'));

app.get('/movie', (req, res) => res.send('Movie endpoint'));
app.get('/review', (req, res) => res.send('Review endpoint'));
app.get('/favorite', (req, res) => res.send('Favorite endpoint'));
app.get('/user', (req, res) => res.send('User endpoint'));
app.get('/genre', (req, res) => res.send('Genre endpoint'));