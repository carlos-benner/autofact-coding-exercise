const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Question = require('../models/Question');

/* GET forms with questions */
router.get(`/:formID`, async (req, res, next) => {
    try {
        const forms = await Question.find({ formID: req.params.formID });
        res.status(200).json(forms);
    } catch (err) {
        res.json({ msg: err });
    }
});

module.exports = router;
