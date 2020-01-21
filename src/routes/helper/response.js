module.exports = function response(code, reason, payload) {
    return {
        code: code,
        reason: reason,
        content: payload
    };
}
