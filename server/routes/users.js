const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.json({ msg: err });
    }
});

router.get('/:id', async (req, res) => {
    let userID = req.params.id;
    try {
        let user = await User.findOne(mongoose.Types.ObjectId(userID));
        return res.status(user ? 200 : 404).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});

router.post('/', async function (req, res) {
    if (!req.body.name || !req.body.password) {
        return res.status(500).json({ msg: 'Name and password are required' });
    }

    try {
        let user = await User.findOne({ name: req.body.name });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashedPassword);

        const newUser = new User({
            name: req.body.name,
            password: hashedPassword,
            role: req.body.role ?? 'user',
        });

        newUser
            .save()
            .then((data) => res.status(200).json(data))
            .catch((err) => {
                console.error(err);
                res.status(500).json(err);
            });
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
        return res.status(400).json({ msg: 'No user' });
    }

    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.json({ code: 'SUCCESS' });
        } else {
            res.json({ code: 'ERROR', msg: 'Wrong username/password' });
        }
    } catch (err) {
        return res.status(500).json({ msg: err });
    }
});

router.delete('/:id', async function (req, res) {
    const userID = req.params.id;
    try {
        let user = await User.findOneAndDelete(
            { _id: mongoose.Types.ObjectId(userID) },
            (err, doc) => {
                if (err || !doc) {
                    return res.status(404).json({
                        msg: `User with id ${userID} not found.`,
                    });
                }
                return res
                    .status(200)
                    .json({ msg: `User with id ${userID} deleted` });
            }
        );
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});

module.exports = router;
