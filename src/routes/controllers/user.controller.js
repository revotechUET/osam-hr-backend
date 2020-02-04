const express = require('express');

const router = express.Router();

const jsonResponse = require('./../helper/response');
const CODE = require('./../helper/response-code');
const makeResponse = require('./../helper/make-response');

const middleWare = require('./../middlewares');
const UserService = require('./../../services/User.service');

router.post('/verifyIdToken', async (req, res) => {
  try {
    const token = await UserService.verifyGoogleIdToken(req.body);
    if (!token) throw { message: 'Can not verify user' }
    makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], token))
  } catch (e) {
    makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, e.errors[0].message, {}));
  }
});

router.post('/info', middleWare.userRequired, async (req, res) => {
  try {
    const user = await UserService.userInfo(req);
    makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], user));
  } catch (error) {
    makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, error.message, {}));
  }

})

router.post('/list', middleWare.managerRequired, async (req, res) => {
  try {
    const user = await UserService.listUser(req.body);
    makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], user));
  } catch (error) {
    makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, error.message, {}));
  }

})

module.exports = router;
