const express = require('express');

const router = express.Router();

const jsonResponse = require('./../helper/response');
const CODE = require('./../helper/response-code');
const makeResponse = require('./../helper/make-response');

const middleWare = require('./../middlewares');
const LeaveService = require('../../services/Leave.service');

router.post('/add', middleWare.authenticateRequired, (req, res) => {
  LeaveService.add({user: req.user, options: req.body}).then(rs => {
    makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], rs));
  }).catch(err => {
    makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, err.message, {}));
  })
});

router.post('/get', middleWare.authenticateRequired, (req, res) => {
  LeaveService.get({user: req.user, options: req.body}).then(rs => {
    makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], rs));
  }).catch(err => {
    makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, err.message, {}));
  })
});

router.post('/approve', middleWare.authenticateRequired, middleWare.requireManager, (req, res) => {
  LeaveService.approve({user: req.user, options: req.body}).then(rs => {
    makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], rs));
  }).catch(err => {
    makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, err.message, {}));
  })
});

router.post('/list-by-user', middleWare.authenticateRequired, (req, res) => {
  req.body.getAll = false;
  LeaveService.list({user: req.user, options: req.body}).then(rs => {
    makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], rs));
  }).catch(err => {
    makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, err.message, {}));
  })
});

router.post('/list', middleWare.authenticateRequired, middleWare.requireManager, (req, res) => {
  req.body.getAll = true;
  LeaveService.list({user: req.user, options: req.body}).then(rs => {
    makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], rs));
  }).catch(err => {
    makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, err.message, {}));
  })
});

router.post('/delete', middleWare.authenticateRequired, middleWare.requireManager, (req, res) => {
  LeaveService.delete({user: req.user, options: req.body}).then(rs => {
    makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], rs));
  }).catch(err => {
    makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, err.message, {}));
  })
});

router.post('/reject', middleWare.authenticateRequired, middleWare.requireManager, (req, res) => {
  LeaveService.reject({user: req.user, options: req.body}).then(rs => {
    makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], rs));
  }).catch(err => {
    makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, err.message, {}));
  })
});
module.exports = router;
