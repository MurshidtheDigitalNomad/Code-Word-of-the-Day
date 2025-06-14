const express = require('express');
const router = express.Router();

const{signUpUser, loginUser}= require('./user.controller.js')

//defining user router middlewares

router.post('/signup', signUpUser)
router.post('/login', loginUser);

module.exports = router;
