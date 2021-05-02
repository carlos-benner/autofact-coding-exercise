const express = require('express');
const axios = require('axios');
const router = express.Router();
const apiUrl = process.env.BACKEND_URL || 'http://localhost:3030';

/*Get questions for user */
router.get('/:formID/', (req, res) => {
    axios
        .get(`${apiUrl}/forms/${req.params.formID}`)
        .then((result) => {
            res.render('form', { id: 1, questions: result.data });
        })
        .catch((err) => {
            return res.status(err?.response?.status).json(err?.response?.data);
        });
});

router.post('/:formID/', (req, res) => {
    console.log(req);
    res.send(req.body);
});

module.exports = router;
