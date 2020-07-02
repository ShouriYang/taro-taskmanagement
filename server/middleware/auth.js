module.exports = options => {
  const assert = require('http-assert')
  const {User} = require('../models/user')
  return async (req, res, next) => {
    const token = req.headers.token
    assert(token, 401, '请先登录')
    req.user = await User.findOne({openid:token})
    assert(req.user, 401, '请先登录')
    await next()
  }
}