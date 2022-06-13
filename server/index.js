const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require('jsonwebtoken')

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    key: "userID",
    secret: "temp",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60*60*24,
    },
}));
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "iChat",
});
app.post("/checkEmail", (req, res) => {
    const email = req.body.email;
    db.query(
        "SELECT * FROM user WHERE email = ?",
        email,
        (err, result) => {
            if(err) {
                return res.send({err: err});
            }
            if(result.length>0) {
                return res.send({registered: false});
            }
            else {
                return res.send({registered: true});
            }
        }
    );
});
app.post("/checkUserName", (req, res) => {
    const userName = req.body.userName;
    db.query(
        "SELECT * FROM user WHERE userName = ?",
        userName,
        (err, result) => {
            if(err) {
                return res.send({err: err});
            }
            if(result.length>0) {
                return res.send({registered: false});
            }
            else {
                return res.send({registered: true})
            }
        }
    );

})
app.post("/register", (req, res) => {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userName = req.body.userName;
    const password = req.body.password;
    const confirmedPassword = req.body.confirmedPassword;
    if(password !== confirmedPassword) {
        return res.send({registered: false, errno: 3});
    }
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if(err) {
            console.log(err);
        }
        db.query(
            "INSERT INTO user (email, firstName, lastName, userName, password) VALUES (?,?,?,?,?)", 
            [email, firstName, lastName, userName, hash], 
            (err, result) => {
                if(err) {
                    return console.log(err);
                }
                else {
                    return res.send({registered: true});
                }
            }
        );
    })
});
const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if(!token) {
        res.send("No token");
    } else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if(err) {
                res.json({auth: false, message: "you failed to authenticate"});
            } else {
                req.userId = decoded.id;
                next();
            }
        })
    }    
}
app.get("/isUserAuth", verifyJWT,(req, res) => {
    res.send("You are authenticated");
})
app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({loggedIn: true, user: req.session.user})
    } else {
        res.send({loggedIn: false})
    }
})
app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query(
        "SELECT * FROM user WHERE email = ?",
        email,
        (err, result) => {
            if(err) {
                res.send({err: err});
            }
            if(result.length>0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if(response) {
                        const id = result[0].id;
                        const token = jwt.sign({id}, "jwtSecret", {
                            expiresIn: 300,
                        })
                        req.session.user = result;
                        res.json({auth: true, token: token, result: result});
                    }
                    else {
                        res.json({auth: false, message: "Password is incorrect"});
                    }
                })
            } else {
                res.send({auth: false, message: "Email does not exist"});
            }
        }
    );
});
app.listen(3001, () => {
    console.log("server running on port 3001");
});