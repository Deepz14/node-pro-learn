const express = require('express');
const app = express();
const swaggerUI = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocument = yaml.load('./swagger.yaml');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');



// IMPORT ALL ROUTES
const userRoutes = require('./routers/user');

// Middlewares
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(express.json()); // TO RECOGNISE THE REQ OBJECT AS JSON
app.use(express.urlencoded({extended: true})); // TO RECOGNISE THE REQ OBJECT AS STRINGS AND ARRAYS
app.use(cookieParser());
app.use(morgan('tiny')); // HTTP REQUEST LOGGER


//ROUTER MIDDLEWARE
app.use('/api/home/', userRoutes);

// Export app.js
module.exports = app;