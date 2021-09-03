const express = require('express');
const router = express.Router();
const axios = require('axios');


router.get('/', async (req, res) => {
  response = await axios.get('https://opentdb.com/api.php?amount=10');
  trivia = response.data.results;
  res.json(trivia);
});

module.exports = router;
