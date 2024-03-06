// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const methodOverride = require('method-override');
const { getAuth } = require("firebase-admin/auth");

// Model
const Entry = require('./models/entry');
// connect Entries Controller
const entriesRouter = require('./controllers/entries');

// initialize app
const app = express();
const admin = require("firebase-admin");

// Application Settings
require('dotenv').config();

const { PORT = 3001,
    DATABASE_URL,
    GOOGLE_PRIVATE_KEY_ID,
    GOOGLE_PRIVATE_KEY,
    GOOGLE_CLIENT_ID
} = process.env;

admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "deckled-edge",
        "private_key_id": GOOGLE_PRIVATE_KEY_ID,
        "private_key": GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        "client_email": "firebase-adminsdk-3015o@deckled-edge.iam.gserviceaccount.com",
        "client_id": GOOGLE_CLIENT_ID,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-3015o%40deckled-edge.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
    })
});

// Database Connection
mongoose.set('strictQuery', true);
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

// auth middleware
app.use(async function (req, res, next) {
    const token = req.get('Authorization');
    if (token) {
        const user = await getAuth().verifyIdToken(token.replace('Bearer ', ''));
        req.user = user;
    } else {
        req.user = null;
    }
    next();
});

function isAuthenticated(req, res, next) {
    if (!req.user) {
        return res.status(401).send('you must be logged in first');
    }
    next();
}

// Mount Routes

// test route
/*app.get('/home', (req, res) => {
    res.send('welcome to deckled edge!');
});
*/
// home route - public
app.get('/', async (req, res) => {
    try {
        res.status(200).json(await Entry.find({ public: true }));
    } catch (error) {
        res.status(400).json({ message: 'something went wrong' });
    }
});
// mount routes
app.use(isAuthenticated, entriesRouter);

// Tell app to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port: ${PORT}`);
});