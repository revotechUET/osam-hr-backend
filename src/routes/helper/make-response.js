module.exports = function makeResponse(res, payload) {
    return res.status(payload.code).json(payload);
}