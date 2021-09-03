const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  response = await axios.get("https://opentdb.com/api.php?amount=10");
  trivia = response.data.results;
  res.json(trivia);
});

router.get("/img/:term", async (req, res) => {
  const searchTerm = req.params.term;
  const options = {
    method: "GET",
    url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI",
    params: {
      q: searchTerm,
      pageNumber: "1",
      pageSize: "10",
      autoCorrect: "true",
    },
    headers: {
      "x-rapidapi-host": process.env.X_HOST,
      "x-rapidapi-key": process.env.X_KEY,
    },
  };
  const response = await axios.request(options);
  const images = response.data;
  res.json(images);
});

module.exports = router;
