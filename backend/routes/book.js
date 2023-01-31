const express = require('express');
const BookReport = require('../models/BookReport');

const router = express.Router();

/**회원가입 라우터 - 한승보 */
router.post('/record', async (req, res, next) => {
  console.log(req.body);
  const { author, categoryName, cover, link, title, content } = req.body;

  const record = await BookReport.create({
    author,
    categoryName,
    cover,
    link,
    title,
    content,
  });
  //console.log(record);
  res.send(true);
});

module.exports = router;
