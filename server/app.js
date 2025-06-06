const express = require('express');
const cors = require('cors');

const app= express();

//routes 
const userRoutes= require('./routes/users/user.route.js');
const wordsRoutes= require('./routes/words/words.router.js');
//middleware
                                                     
app.use(express.json());

app.use(cors({
    origin: 'https://code-word-of-the-day.vercel.app'
}));

app.use('/api/users', userRoutes)
app.use('/api/codeword', wordsRoutes);

module.exports = app;