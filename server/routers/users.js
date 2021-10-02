const UserController = require('../lib/db/users/controller')
const auth = require('../middleware/auth')
const {StatusCodes} = require('http-status-codes')
const bcrypt = require('bcrypt')

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/signup', async function (req, res) {
  try{
    const {username, balance = 0, password} = req.body

    if(!username && password) {
      return res.responseDefaultError(StatusCodes.PRECONDITION_FAILED)
    }
  
    const encryptedPassword = await bcrypt.hash(password, 10)
    const UserCon = new UserController()
    const newUser = await UserCon.create({
      username,
      balance,
      password: encryptedPassword
    })
    res.status(StatusCodes.CREATED)
    return res.json(newUser)
  }
  catch(e) {
    console.error(e)
    return res.responseDefaultError(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})


router.post('/login', async function (req, res) {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      return res.responseDefaultError(StatusCodes.PRECONDITION_FAILED)
    }

    const UserCon = new UserController()
    const user = await UserCon.findByUsername(username, {includePassword: true})
    if(!user) return res.responseDefaultError(StatusCodes.FORBIDDEN)

    const isCorrectPassword= await bcrypt.compare(password, user.password)
    if(!isCorrectPassword) return res.responseDefaultError(StatusCodes.FORBIDDEN)

    const token = auth.signToken(user)
    return res.status(200).json({
      ...user,
      token
    });
  } catch (e) {
    console.error(e)
    return res.responseDefaultError(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

module.exports = router;