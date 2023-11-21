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
        res.status(400).json({ message: 'something went wrong' });
    }
});

// NEW - probably front end routing with form

// DELETE
router.delete('/read/:id', async (req, res) => {
    try {
        res.status(200).json(await Entry.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json({ message: 'something went wrong' });
    }
});
// UPDATE

// CREATE
router.post('/read', async (req, res) => {
    try {
        res.status(201).json(await Entry.create(req.body));
    } catch (error) {
        res.status(400).json({ message: 'something went wrong' });
    }
});

// EDIT


// SHOW
router.get('/read/:id', async (req, res) => {
    try {
        const entry = await Entry.findById({ _id: req.params.id });
        res.status(200).json(entry);
    } catch (error) {
        res.status(400).json({ message: 'something went wrong' });
    }
});


module.exports = router;