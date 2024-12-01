import express from 'express';

const app = express();

app.listen(3001, () => {
    console.log('Server running in port 3001');
});

app.get('/', (req, res) => res.send('Hello world'));

app.get('/movie', (req, res) => res.send('Movie endpoint'));
app.get('/review', (req, res) => res.send('Review endpoint'));
app.get('/favorite', (req, res) => res.send('Favorite endpoint'));
app.get('/users', (req, res) => res.send('Users endpoint'));
app.get('/genre', (req, res) => res.send('Genre endpoint'));

app.post('/genre', (req, res) =>{
    let user = req.body;
    console.log(user);
    res.send();
});