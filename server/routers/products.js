
const express = require('express');
const {StatusCodes, getReasonPhrase} = require('http-status-codes')
const router = express.Router();
const ProductController = require('../lib/db/products/controller')

// Home page route.
router.get('/', async (req, res) => {
  try {
    const ProductCon = new ProductController()
    const foundItemList = await ProductCon.list()
    res.status(StatusCodes.OK)
    return res.json(foundItemList);
  }
  catch(e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    return res.json({
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
    });
  }
})

module.exports = router;