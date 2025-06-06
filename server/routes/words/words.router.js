const express = require('express');
const router = express.Router();
const {CodeWordOfTheDay, techStack, searchWord, codetionaryWords} = require('./words.controller.js');

router.get('/techstack/search', searchWord);
router.get('/techstack', techStack);
router.get('/:index', CodeWordOfTheDay);
router.post('/codetionary', codetionaryWords);



module.exports = router;