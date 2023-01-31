const express = require('express');
const { User } = require('../models');
const BookReport = require('../models/BookReport');

const router = express.Router();

/**회원가입 라우터 - 한승보 */
router.post('/', async (req, res, next) => {
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

module.exports = router;
