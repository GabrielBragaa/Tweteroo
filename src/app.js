import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
    users.push({username: req.body.username, avatar: req.body.avatar});
    res.send('OK');
});

app.post('/tweets', (req, res) => {
    if (!users.includes(req.body.username)) {
        console.log('UNAUTHORIZED');
        console.log(users)
    } else {
        tweets.push({username: req.body.username, tweet: req.body.tweet});
        res.send('OK');
    }
})

app.get('/tweets', (req, res) => {

    res.send(tweets);
})


app.listen(5000, () => console.log('Servidor iniciado...'));