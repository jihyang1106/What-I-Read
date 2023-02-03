const express = require('express');
const BookReport = require('../models/BookReport');
const { User, Comment } = require('../models');
const { default: axios } = require('axios');

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

/** 나의 서재 리스트 */
router.get('/mybookList', async (req, res) => {
  console.log(req.query.id);
  const result = await BookReport.findAll({
    where: {
      User_id: req.query.id,
    },
    order: [['id', 'DESC']],
  });
  res.send(result);
});

/** 나의 서재에서 나의 기록 수정 */
router.patch('/mybookUpdate', async (req, res) => {
  let data = {
    content: req.body.data.content,
  };
  await BookReport.update(data, {
    where: { id: req.body.data.id, User_id: req.body.data.User_id },
  });
  const result = await BookReport.findOne({
    where: { id: req.body.data.id, User_id: req.body.data.User_id },
  });
  console.log(result);
  res.send(result);
});
router.post('/bestSeller', async (req, res) => {
  const bestSeller = await axios({
    method: 'get',
    url: `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${encodeURIComponent('ttb96tmdqh1639001')}&QueryType=ItemNewAll&MaxResults=8&start=1&SearchTarget=Book&output=js&Version=20131101`,
    
  })
    console.log(bestSeller.data.item)
  res.send(bestSeller.data.item)
});

module.exports = router;
