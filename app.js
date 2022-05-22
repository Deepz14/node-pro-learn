const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');


// IMPORT ALL ROUTES
const homeRoutes = require('./routers/homeRoutes');

// Middlewares
app.use(express.json()); // TO RECOGNISE THE REQ OBJECT AS JSON
app.use(express.urlencoded({extended: true})); // TO RECOGNISE THE REQ OBJECT AS STRINGS AND ARRAYS
app.use(cookieParser());
app.use(morgan('tiny')); // HTTP REQUEST LOGGER


//ROUTER MIDDLEWARE
app.use('/api/v1/home/', homeRoutes);

// Export app.js
module.exports = app;