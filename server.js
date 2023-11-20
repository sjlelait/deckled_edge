// Dependencies
const mongoose = require('mongoose');
const express = require('express');

const app = express();

// Application Settings
require("dotenv").config();

const { PORT = 3001, DATABASE_URI } = process.env;

// Database Connection
mongoose.connect(DATABASE_URI);

mongoose.connection
    .on('open', () => console.log('You are connected to MongoDB'))
    .on('close', () => console.log('You are disconnected from MongoDB'))
    .on('error', (error) => console.log(`MongoDB Error: ${error.message}`));

// Models

// Mount Middleware 

app.use(express.json());

// Mount Routes
// test route
app.get('/', (req, res) => {
    res.send('hello world');
});


// Tell app to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port: ${PORT}`);
});