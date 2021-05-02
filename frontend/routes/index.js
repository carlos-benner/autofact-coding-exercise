const express = require('express');
const axios = require('axios');
const passport = require('passport');
const router = express.Router();
const apiUrl = process.env.BACKEND_URL || 'http://localhost:3030';

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index.ejs', { title: 'hola' });
});

router.get('/login', function (req, res, next) {
    res.render('login.ejs', { msg: '' });
});
router.get('/login2', function (req, res, next) {
    res.render('login2.ejs', { msg: '' });
});

router.get('/register', function (req, res, next) {
    res.render('register.ejs', { msg: '' });
});

//Create users
router.post('/register', (req, res) => {
    const user = {
        name: req.body.userName,
        password: req.body.password,
        role: req.body.userRole,
    };
    axios
        .post(`${apiUrl}/users`, user)
        .then((result) => {
            return res.json(result.data);
        })
        .catch((err) => {
            return res.status(err?.response?.status).json(err?.response?.data);
        });
});

//Login users
router.post('/login2', (req, res) => {
    const user = {
        name: req.body.userName,
        password: req.body.password,
    };
    axios
        .post(`${apiUrl}/users/login`, user)
        .then((result) => {
            return res.json(result.data);
        })
        .catch((err) => {
            return res.status(err?.response?.status).json(err?.response?.data);
        });
});

router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true,
    })
);

module.exports = router;
