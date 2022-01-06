const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const helmet = require("helmet");
const xssClean = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const connectDB = require('./config/db');
const morgan = require('morgan');
const bodyParser = require('body-parser');

dotenv.config({ path: './config/config.env' });

connectDB();

const auth = require('./routes/authRoute');
const product = require('./routes/productRoute');
const brand = require('./routes/brandRoute');

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan('dev'));

//File uploading
app.use(fileupload());

//Set security headers
app.use(helmet());

//Prevent XSS attacks
app.use(xssClean());

//Sanitize data
app.use(mongoSanitize());

//Prevent http param pollution
app.use(hpp());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/auth', auth);
app.use('/api/v1/products', product);
app.use('/api/v1/brands', brand);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, console.log(`Server running on port ${PORT}`.cyan.inverse));

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(() => process.exit(1));
});