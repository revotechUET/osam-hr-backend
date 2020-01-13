const express = require('express');

const router = express.Router();

const jsonResponse = require('./../helper/response');
const CODE = require('./../helper/response-code');
const makeResponse = require('./../helper/make-response');

const UserService = require('./../../services/User.service');

router.post('/new', (req,res)=>{
    UserService.createUser(req.body)
    .then((user)=>{
        makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], user));
    })
    .catch((e)=>{
        makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, e.message, {}));
    })
});

router.post('/login', async (req, res)=>{
    UserService.verifyLogin(req.body)
    .then((token)=>{
        makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], {username: req.body.username, token: token}));
    })
    .catch((e)=>{
        makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, e.message, {}));
    });
});

module.exports = router;