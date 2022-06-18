const express = require('express');
const app = express();
const swaggerUI = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocument = yaml.load('./swagger.yaml');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');

// ejs template engine config
app.set('view engine', 'ejs')

// IMPORT ALL ROUTES
const authRoutes = require('./routers/auth');
const userRoutes = require('./routers/user');
const productRoutes = require('./routers/product');
const paymentRoutes = require('./routers/payment');
const orderRoutes = require('./routers/order');

// Middlewares
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(express.json()); // TO RECOGNISE THE REQ OBJECT AS JSON
app.use(express.urlencoded({extended: true})); // TO RECOGNISE THE REQ OBJECT AS STRINGS AND ARRAYS
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))
app.use(morgan('tiny')); // HTTP REQUEST LOGGER


//ROUTER MIDDLEWARE
app.use('/api/auth/', authRoutes);
app.use('/api/user/', userRoutes);
app.use('/api/product/', productRoutes);
app.use('/api/payment/', paymentRoutes);
app.use('/api/order', orderRoutes);

// Welcome Route
app.get('/', (req, res) => {
    res.send('Hello, Welcome to the Application');
})

// view ejs signupForm route
app.get('/signupForm', (req, res) => {
    res.render('signup');
})

// Export app.js
module.exports = app;