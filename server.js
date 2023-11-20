// Dependencies
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const methodOverride = require('method-override');

// Models
const Entry = require('./models/entry');
const Word = require('./models/word');

const app = express();

// Application Settings
require("dotenv").config();

const { PORT = 3001, DATABASE_URL } = process.env;

// Database Connection
mongoose.connect(DATABASE_URL);

mongoose.connection
    .on('open', () => console.log('You are connected to MongoDB'))
    .on('close', () => console.log('You are disconnected from MongoDB'))
    .on('error', (error) => console.log(`MongoDB Error: ${error.message}`));


// Mount Middleware 
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(methodOverride('_method'));

// Mount Routes
// test route
app.get('/', (req, res) => {
    res.send('hello world');
});


// Tell app to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port: ${PORT}`);
});