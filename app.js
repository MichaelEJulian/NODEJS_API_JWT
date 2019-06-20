const express = require('express');
const jwt = require('jsonwebtoken');


const app = express();

app.get('/api', (req, res) => {
    res.json({
        message : 'Welcome to the API'
    });
});

app.post('/api/posts', verifyToken, (req, res) => {

    jwt.verify(req.token, 'anysecretkey', (err, authData) => {
        if (err){
            res.sendStatus(403);
        }
        else{
            res.json({
                message: 'Post created...',
                authData
            });
        }
    });

   
});

app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: 'brad',
        email: 'brad@gmail.com'
    }

    jwt.sign({user}, 'anysecretkey', { expiresIn: '120s' }, (err, token) => {
        res.json({
            token
        });
    });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token></access_token>

//Verify Token
function verifyToken(req, res, next){
    //Get Authe header value
    const bearerHeader = req.headers['authorization'];

    //check if bearer is undefined

    if (typeof bearerHeader !== 'undefined' ){
        // Split after space
        const beader = bearerHeader.split(' ');

        // Get token from array
        const bearerToken = beader[1];

        //Set the token
        req.token = bearerToken;

        //Next middleware
        next();
    }
    else{
        res.sendStatus(403);

    }
}

app.listen(5000, () => console.log('Server started on port 5000'));