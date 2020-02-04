module.exports = function makeResponse(res, { code, reason, content }) {
  return res.status(code).json({code, reason, content});
}
