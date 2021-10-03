
const express = require('express');
const {StatusCodes, getReasonPhrase} = require('http-status-codes')
const router = express.Router();
const ProductController = require('../lib/db/products/controller')

const bodyParser = require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', async (req, res) => {
  try {
    const {title,price,quantity,beginAt} = req.body
    const ProductCon = new ProductController()
    const createItem = await ProductCon.create({title,price,quantity,beginAt})

    res.status(StatusCodes.OK)
    return res.json(createItem);
  }
  catch(e) {
    return res.responseDefaultError(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})


router.patch('/:id', async (req, res) => {
  try {
    const {id} = req.params
    const {title,price,quantity,beginAt} = req.body
    const ProductCon = new ProductController()
    const updatedItem = await ProductCon.update(id, {title,price,quantity,beginAt})

    res.status(StatusCodes.OK)
    return res.json(updatedItem);
  }
  catch(e) {
    return res.responseDefaultError(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params

    if(!id) {
      return res.responseDefaultError(StatusCodes.PRECONDITION_FAILED)
    }
    
    const ProductCon = new ProductController()
    const foundItem = await ProductCon.findById(id)
    res.status(StatusCodes.OK)
    return res.json(foundItem)
  }
  catch(e) {
    return res.responseDefaultError(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

router.get('/', async (req, res) => {
  try {
    const ProductCon = new ProductController()
    const foundItemList = await ProductCon.list()
    res.status(StatusCodes.OK)
    return res.json(foundItemList);
  }
  catch(e) {
    return res.responseDefaultError(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

module.exports = router;