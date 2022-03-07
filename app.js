require('dotenv').config();
const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('<h1> Welcome to the Authentication app </h1>'));

module.exports = app;