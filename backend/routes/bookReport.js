const express = require('express');
const BookReport = require('../models/BookReport');


const router = express.Router();


/**회원가입 라우터 - 한승보 */
router.post('/record', async (req, res, next) => { 
  console.log(req.body)
  
  try {


  }catch(err){
    console.error(err);
    return next(err);
  }
})








module.exports = router;