const express = require('express');

const router = express.Router();

const jsonResponse = require('./../helper/response');
const CODE = require('./../helper/response-code');
const makeResponse = require('./../helper/make-response');

const middleWare = require('./../middlewares');
const LeaveService = require('../../services/Leave.service');

router.post('/add', middleWare.userRequired, (req, res) => {
  LeaveService.add({user: req.user, options: req.body}).then(rs => {
    makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], rs));
  }).catch(err => {
    makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, err.message, {}));
  })
});

router.post('/get', middleWare.userRequired, (req, res) => {
  LeaveService.get({user: req.user, options: req.body}).then(rs => {
    makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], rs));
  }).catch(err => {
    makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, err.message, {}));
  })
});

router.post('/approve', middleWare.userRequired, middleWare.managerRequired, (req, res) => {
  LeaveService.approve({user: req.user, options: req.body}).then(rs => {
    makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], rs));
  }).catch(err => {
    makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, err.message, {}));
  })
});

router.post('/list-by-user', middleWare.userRequired, (req, res) => {
  req.body.getAll = false;
  LeaveService.list({user: req.user, options: req.body}).then(rs => {
    makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], rs));
  }).catch(err => {
    makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, err.message, {}));
  })
});

router.post('/list', middleWare.userRequired, middleWare.managerRequired, (req, res) => {
  req.body.getAll = true;
  LeaveService.list({user: req.user, options: req.body}).then(rs => {
    makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], rs));
  }).catch(err => {
    makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, err.message, {}));
  })
});

router.post('/delete', middleWare.userRequired, middleWare.managerRequired, (req, res) => {
  LeaveService.delete({user: req.user, options: req.body}).then(rs => {
    makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], rs));
  }).catch(err => {
    makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, err.message, {}));
  })
});

router.post('/reject', middleWare.userRequired, middleWare.managerRequired, (req, res) => {
  LeaveService.reject({user: req.user, options: req.body}).then(rs => {
    makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], rs));
  }).catch(err => {
    makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, err.message, {}));
  })
});
module.exports = router;
