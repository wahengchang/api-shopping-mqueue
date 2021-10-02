// reference: 
// https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
const jwt = require("jsonwebtoken");
const {AUTH_SECRET= 'randomPharse'} = require('../../config')

const requiredLogin = (req, res, next) => {
  const bearerHeader = req.header('authorization')
  const bearer = bearerHeader.split(' ')
  const token = bearer[1]
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, AUTH_SECRET);
    res.locals.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

const signToken = (userItem) => {
    const {id, username} = userItem
    return jwt.sign(
        { id, username },
        AUTH_SECRET,
        {
          expiresIn: "2h",
        }
      );
}

module.exports = {
    requiredLogin,
    signToken
};