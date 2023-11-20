// Dependencies
const express = require('express');

const app = express();

// Application Settings
require("dotenv").config();

const { PORT = 3001, DATABASE_URI } = process.env;

// Mount Middleware 


// Mount Routes
// test route
app.get('/', (req, res) => {
    res.send('hello world');
});


// Tell app to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port: ${PORT}`);
});