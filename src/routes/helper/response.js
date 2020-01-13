module.exports = function response(code, reason, payload) {
    return {
        code: code,
        reason: reason,
        content: payload
    };
}

// export function makeResponse(res, payload) {
//     return res.status(payload.code).json(payload);
// }