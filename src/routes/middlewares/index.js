const jwt = require('jsonwebtoken');

const config = require('config');

const jsonResponse = require('./../helper/response');
const CODE = require('./../helper/response-code');

const jwtKey = process.env.JWT_KEY || (config.application || {}).jwtKey || "jwtKeyDefault";

let createMiddleware = function(validateFn, rejectResponse) {
    return function(req, res, next) {
        if (validateFn(req)) {
            next();
        } else {
            let response = rejectResponse || jsonResponse(CODE.FORBIDDEN, CODE[CODE.FORBIDDEN], {});
            res.status(response.code).json(response);
            return;
        }
    }
};

module.exports.createMiddleware = createMiddleware;

module.exports.tokenChecker = function(req, res, next) {
    const token = req.headers['Authorization'] || req.headers['authorization'] 
                    || req.body.token || req.query.token || req.headers['x-access-token'];
    req.decoded = null;
    if (token) {
        try {
            req.decoded = jwt.verify(token, jwtKey);
        } catch (e) {
            //do nothing
        }
    }
    next();
};

//login required
module.exports.authenticateRequired = createMiddleware((req)=>{
    if (req.decoded) return true;
    return false;
}, jsonResponse(CODE.UNAUTHORIZED, CODE[CODE.UNAUTHORIZED], {}));


//role <= 1 required
module.exports.roleAtLeastOne = createMiddleware((req)=>{
    if (req.decoded.role > 1) return false;
    return true; 
});

module.exports.onlySystemAdmin = createMiddleware((req)=>{
    if (req.decoded.role < 1) return true;
    return false;
}, jsonResponse(CODE.FORBIDDEN, "You have no permission. System admin access only", {}));