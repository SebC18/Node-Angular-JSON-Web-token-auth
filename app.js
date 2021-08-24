const express       = require('express')
const bodyParser    = require('body-parser');
const cors          = require('cors');
const jwt           = require('jsonwebtoken');
var expressJWT      = require('express-jwt');

const app           = express();
const port          = 3000;

app.use(cors());
app.options('*', cors());
app.use(express.json({limit: '10mb', extended: true}));
app.use(express.urlencoded({limit: '10mb', extended: true}));

app.get('/', (req, res) => {
    res.json("Hello World");
});

/* more code to be added later */

/* the listen function */
app.listen(port, function() {
    console.log("Listening to " + port);
});

let secret = 'some_secret';

app.get('/token/sign', (req, res)=>{
    var userData = {
        "name": "My Name",
        "id": "1234"
    }
    let token = jwt.sign(userData, secret, {expiresIn: '15s'})
    res.status(200).json({"token": token});
});

app.use(expressJWT({ secret: secret, algorithms: ['HS256']})
    .unless(
        { path: [
            'token/sign'
        ]})
    )

app.get('/path1', (req,res)=>{
    res.status(200)
        .json({
            "success": true,
            "msg": "Secret Access Granted"
        });
});