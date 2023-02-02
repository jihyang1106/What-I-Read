const express = require('express');
const BookReport = require('../models/BookReport');
const { User, Comment } = require('../models');

const router = express.Router();

/**독서 기록하기 라우터 - 한승보 */
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
  const { User_id, BookReport_id, comment } = req.body;
  const commentInfo = await Comment.create({
    User_id,
    BookReport_id,
    comment,
  });

  res.send(commentInfo);
});

router.post('/commentList', async (req, res, next) => {
  console.log(req.body);
  const { BookReport_id, CommentLength } = req.body;
  if (CommentLength) {
    console.log(CommentLength);
    const comments = await Comment.findAll({
      where: {
        BookReport_id,
      },
      limit: 3,
      offset: CommentLength,
      order: [['id', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['nickname'],
        },
      ],
    });
    console.log(comments);
    res.send(comments);
  } else {
    const comments = await Comment.findAll({
      where: {
        BookReport_id,
      },
      limit: 3,
      order: [['id', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['nickname'],
        },
      ],
    });
    console.log(comments);
    res.send(comments);
  }
});

router.get('/mybookList', (req, res) => {
  console.log('요청 들어왔어용');
  console.log('req.query'.req);
  res.send(true);
});

module.exports = router;
