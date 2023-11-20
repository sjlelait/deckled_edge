const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');
const Word = require('../models/word');

// INDEX
router.get("/read", async (req, res) => {
    try {
        res.status(200).json(await Entry.find({}));
    } catch (error) {
        res.status(400).json({ message: "something went wrong" });
    }
});

// NEW


// DELETE


// UPDATE


// CREATE


// EDIT


// SHOW

module.exports = router;