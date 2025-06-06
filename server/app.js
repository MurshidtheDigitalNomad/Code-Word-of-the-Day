const express = require('express');
const cors = require('cors');

const app= express();

//routes 
const userRoutes= require('./routes/users/user.route.js');
const wordsRoutes= require('./routes/words/words.router.js');
//middleware
                                                     
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use('/api/users', userRoutes)
app.use('/api/codeword', wordsRoutes);

module.exports = app;