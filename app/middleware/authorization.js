const jwt = require('jsonwebtoken')
const {status, code} = require('../helper/status')

const checkToken = (req, res, next) => {
  const { authorization } = req.headers
  if (authorization && authorization.startsWith('Bearer')) {
    let tokenJwt = authorization.slice(7, authorization.length)
    try {
      tokenJwt = jwt.verify(tokenJwt, process.env.APP_KEY)
      if (tokenJwt) {
        req.user = tokenJwt
        next()
      } else {
        res.status(code.unauthorized).send(status(code.unauthorized))
      }
    } catch(err) {
      console.log('error token')
      res.status(code.unauthorized).send(status(code.unauthorized))
    }
  } else {
    res.status(code.unauthorized).send(status(code.unauthorized))
  }
}

const checkRole = (req, res, next) => {
  const {role_id} = req.user
  if (role_id === 1) {
    next()
  } else {
    res.status(code.success).send({success: false, message: 'Admin only'})
  }
}




module.exports = {
  checkToken,
  checkRole
}