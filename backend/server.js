const express = require("express");
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser'); 

const app = express();

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 


const users = [
    { id: 1, username: "user1", password: "password1" },
    { id: 2, username: "user2", password: "password2" },
    { id: 3, username: "user3", password: "password3" },
  ];
  

app.get('/api', (req, res) => {
    res.json({
        message: "Hello Api"
    });
});

app.post('/api/login', (req, res) => {
    console.log('req data', req.body.password, req.body.username);
    users.filter(user=>{
        if (user.username===req.body.username) {
            if (user.password===req.body.password) {

                const payload={
                    "id":user.id,
                    "name":user,
                }

                jwt.sign(payload,'shhh',{expiresIn:'10h'},(err,token)=>{
                    res.json({
                        token:token,
                        user:user
                    })
                })
            }
        }
    })
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'shhh', (err, authData) => {
        if (err) {
            res.status(403).json({ error: "Forbidden" });
        } else {
            res.json({
                message: "success",
                authData: authData
            });
        }
    });
});

function verifyToken(req,res,next) {
    const bearerHeader=req.headers['authorization'];
    console.log(typeof bearerHeader);
    if (typeof bearerHeader !== 'undefined') {
        const bearer=bearerHeader.split(' ');
        const bearerToken=bearer[1];
        req.token=bearerToken;
        next();
    } else {
        console.log("Error");
    }
}

app.listen(8080, () => {
    console.log("Server Started On Port 8080");
});
