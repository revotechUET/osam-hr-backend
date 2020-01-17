module.exports = function makeResponse(res, { code, reason, content }) {
  res.statusMessage = reason;
  return res.status(code).json(content);
}
