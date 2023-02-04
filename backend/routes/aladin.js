const express = require('express');
const { default: axios } = require('axios');

const router = express.Router();

router.post('/bestSeller', async (req, res) => {
  const bestSeller = await axios({
    method: 'get',
    url: `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${encodeURIComponent('ttb96tmdqh1639001')}&QueryType=ItemNewAll&MaxResults=8&start=1&SearchTarget=Book&output=js&Version=20131101`,
    
  })
    console.log(bestSeller.data.item)
  res.send(bestSeller.data.item)
});
router.post('/search', async (req, res) => {
  console.log(req.body)
  const search = await axios({
    method: 'get',
    url: `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttb96tmdqh1639001&Query=${req.body.data}&QueryType=Title&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101`,
    
  })
    console.log(search.data.item)
  res.send(search.data.item)
});

module.exports = router;
