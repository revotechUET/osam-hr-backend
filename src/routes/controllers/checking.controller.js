const express = require('express');

const router = express.Router();

const jsonResponse = require('./../helper/response');
const CODE = require('./../helper/response-code');
const makeResponse = require('./../helper/make-response');

const middleWare = require('./../middlewares');

//const UserService = require('./../../services/User.service');
const CheckingService = require('./../../services/Checking.service');

/*
    req.body: {
        note,
        report
    }
*/
router.post('/checkin', middleWare.authenticateRequired, (req,res)=>{
    let idUser = req.decoded.idUser;
    CheckingService.checkin(idUser, req.body.note, req.body.report)
    .then((rs)=>{
        makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], rs));
    })
    .catch(e=>{
        makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, e.message, {}));
    });
});

/*
    req.body: {
        note,
        report
    }
*/
router.post('/checkout', middleWare.authenticateRequired, (req,res)=>{
    let idUser = req.decoded.idUser;
    CheckingService.checkout(idUser, req.body.note, req.body.report)
    .then((rs)=>{
        makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], rs));
    })
    .catch(e=>{
        makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, e.message, {}));
    });
});

/*
    NULL
*/
router.post('/status', middleWare.authenticateRequired, (req,res)=>{
    let idUser = req.decoded.idUser;
    CheckingService.status(idUser)
    .then((rs)=>{
        makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], rs));
    })
    .catch(e=>{
        makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, e.message, {}));
    });
});

module.exports = router;