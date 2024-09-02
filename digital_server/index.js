const express = require('express');
const db = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const path = require('path'); // Import the path module


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));
const dotenv = require("dotenv");

const Razorpay = require('razorpay');

// Setting up environment variables
dotenv.config();

const port = 4000;

const adminRouter = require('./Routes/adminRouter');
const providerRouter = require('./Routes/serviceProviderRoute');
const entrepreneurRouter = require('./Routes/entrepreneurRouter');
const customerRouter = require('./Routes/customerRouter');
const authRouter = require('./Routes/Router');

db();

app.get('/', (req, res) => {
    res.send('Loaded');
});

app.use('/customer', customerRouter);
app.use('/provider', providerRouter);
app.use('/admin', adminRouter);
app.use('/entrepreneur', entrepreneurRouter);
app.use('/auth', authRouter);

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
    console.log('Server Is Running on port', port);
});
