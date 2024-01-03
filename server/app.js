const express = require('express');
const cors = require('cors');

// importing environment variables
const dotenv = require('dotenv');
dotenv.config({path: "./config/config.env"});

const app = express();

// using middlewares
app.use(cors());

module.exports = app;