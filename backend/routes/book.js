const express = require('express');
const BookReport = require('../models/BookReport');
const { User } = require('../models');

const router = express.Router();

/**회원가입 라우터 - 한승보 */
router.post('/record', async (req, res, next) => {
  console.log(req.body);
  const { author, categoryName, cover, link, title, content, id } = req.body;

  const record = await BookReport.create({
    author,
    categoryName,
    cover,
    link,
    title,
    content,
    User_id: id,
  });
  //console.log(record);
  res.send(true);
});

router.post('/recentRecordList', async (req, res, next) => {
  const recentRecordList = await BookReport.findAll({
    limit: 10,
    include: [
      {
        model: User,
        attributes: ['nickname'],
      },
    ],
  });
  console.log(recentRecordList);
  res.send(recentRecordList);
});

router.post('/comment', async (req, res, next) => {
  console.log(req.body);
  const { User_id, BookReport_id } = req.body;
});

module.exports = router;
