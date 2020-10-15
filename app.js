const express = require("express");
const app = express();
require('dotenv').config();

const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);

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


//Middleware
app.use('/posts', () => {
    console.log("This is a middleware running");
});

app.get('/', (req, res) =>{
    res.send("Cuck");
});


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));