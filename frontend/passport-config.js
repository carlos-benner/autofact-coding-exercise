const LocalStrategy = require('passport-local').Strategy;
const axios = require('axios');
const apiUrl = process.env.BACKEND_URL || 'http://localhost:3030';

function initializePassport(passport) {
    const authenticateUser = async function (userName, password, done) {
        try {
            const user = {
                name: userName,
                password: password,
            };

            axios
                .post(`${apiUrl}/users/login`, user)
                .then((result) => {
                    console.log('login success');
                    return done(null, result);
                })
                .catch((err) => {
                    console.log('login failed');
                    return done(null, false, { message: err });
                });
        } catch (err) {
            console.log(err);
            return done(err);
        }
    };

    passport.use(
        new LocalStrategy({ usernameField: 'userName' }, authenticateUser)
    );
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));
}

module.exports = initializePassport;
