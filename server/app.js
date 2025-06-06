const express = require('express');
const cors = require('cors');

const app= express();

//routes 
const userRoutes= require('./routes/users/user.route.js');
const wordsRoutes= require('./routes/words/words.router.js');
//middleware
                                                     
app.use(express.json());



const allowedOrigins = [ 'https://code-word-of-the-day.vercel.app',
  /\.vercel\.app$/];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser clients like Postman
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use('/api/users', userRoutes)
app.use('/api/codeword', wordsRoutes);

module.exports = app;