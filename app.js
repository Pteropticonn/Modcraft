const express = require("express");
const app = express();
require('dotenv').config();

const path = require('path');

//Mongo Access
// Mongo access
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
  auth: {
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  },
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(err => console.error(`Error: ${err}`));

// Implement Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Set our views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/css', express.static('assets/css'));
app.use('/javascript', express.static('assets/javascript'));
app.use('/images', express.static('assets/images'));

// Setup flash notifications and defaults
const flash = require('connect-flash');
app.use(flash());

//Middleware
const routes = require('./routes.js');
app.use('/', routes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));