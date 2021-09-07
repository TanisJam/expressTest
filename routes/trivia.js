const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/", async (req, res) => {
  response = await axios.get("https://opentdb.com/api.php?amount=10");
  trivia = response.data.results;
  res.json(trivia);
});

router.get("/img/:term", async (req, res) => {
  const searchTerm = req.params.term;
  const html = await axios.get(
    `https://www.google.com.ar/search?q=${searchTerm}&tbm=isch&ved=2ahUKEwj7gaiM5-PyAhXujJUCHctzDc4Q2-cCegQIABAA&oq=auto+azul&gs_lcp=CgNpbWcQA1AAWABgh21oAHAAeACAAQCIAQCSAQCYAQCqAQtnd3Mtd2l6LWltZw&sclient=img&ei=QZsyYbvdNe6Z1sQPy-e18Aw`
  );
  const $ = await cheerio.load(html.data);
  let data = [];  
  $('img').each((i, element) => {
    if(i > 0 ) {
      data.push({url: $(element).attr('src')})
    }
  })
  //res.render('images', { images: data });
  res.json({data});
});

// router.get("/img/:term", async (req, res) => {
//   const searchTerm = req.params.term;
//   const options = {
//     method: "GET",
//     url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI",
//     params: {
//       q: searchTerm,
//       pageNumber: "1",
//       pageSize: "10",
//       autoCorrect: "true",
//     },
//     headers: {
//       "x-rapidapi-host": process.env.X_HOST,
//       "x-rapidapi-key": process.env.X_KEY,
//     },
//   };
//   const response = await axios.request(options);
//   const images = response.data;
//   res.json(images);
// });

module.exports = router;