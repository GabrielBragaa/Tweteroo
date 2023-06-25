import express from 'express';
import cors from 'cors';
import { type } from 'os';

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

let userGlobal = {
    username: '',
    avatar: ''
}

let tweetGlobal = {
    username: '',
    tweet: ''
}

app.post('/sign-up', (req, res) => {
    const {username, avatar} = req.body
    if (username === '' || avatar === '' || typeof(username) !== 'string' || typeof(avatar) !== 'string') {
        return res.status(400).send('Preencha todos os campos.');
    }

    userGlobal = {
        username: username,
        avatar: avatar
    }

    users.push(userGlobal);
    res.status(201).send('OK');
});


app.post('/tweets', (req, res) => {
    const {username, tweet} = req.body;
    tweetGlobal = {
        username: username,
        tweet: tweet,
        avatar: userGlobal.avatar
    }

    if (username === '' || tweet === '' || typeof(username) !== 'string' || typeof(tweet) !== 'string') {
        return res.status(400).send('Preencha todos os campos.');
    };

    if (userGlobal.username === undefined || userGlobal.username === '') {
        return res.status(401).send('UNAUTHORIZED');
    };

    tweets.push(tweetGlobal);
    res.status(201).send('OK');

})

app.get('/tweets', (req, res) => {
    if (tweets.length <= 10) {
        res.send(tweets);
    } else {
        res.send(tweets.slice(-10));
    }
})


app.listen(5000, () => console.log('Servidor iniciado...'));