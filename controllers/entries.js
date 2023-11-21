const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');
const Word = require('../models/word');

// INDEX
// read (logged in)
router.get('/read', async (req, res) => {
    try {
        res.status(200).json(await Entry.find({}));
    } catch (error) {
        res.status(400).json({ message: "something went wrong" });
    }
});

// NEW (form)

// DELETE

// UPDATE


// CREATE
router.post("/")

// EDIT


// SHOW

module.exports = router;