const express = require('express');
const axios = require('axios');
const router = express.Router();
const apiUrl = process.env.BACKEND_URL || 'http://localhost:3030';

/*Get questions for user */
router.get('/:userID', (req, res) => {
    axios
        .get(`${apiUrl}/questions/${req.params.userID}`)
        .then((result) => {
            return res.json(result.data);
        })
        .catch((err) => {
            return res.status(err?.response?.status).json(err?.response?.data);
        });
});

router.get('/:query', (req, res) => {
    axios
        .get(`${apiUrl}/users/${req.params.query}`)
        .then((result) => {
            return res.json(result.data);
        })
        .catch((err) => {
            console.error(err);
            return res.status(err?.response?.status).json(err?.response?.data);
        });
});

router.delete('/:id', (req, res) => {
    axios
        .delete(`${apiUrl}/users/${req.params.id}`)
        .then((result) => {
            return res.json(result.data);
        })
        .catch((err) => {
            console.error(err);
            return res.status(err?.response?.status).json(err?.response?.data);
        });
});
module.exports = router;
