const express = require('express');

const router = express.Router();

const jsonResponse = require('./../helper/response');
const CODE = require('./../helper/response-code');
const makeResponse = require('./../helper/make-response');

const UserService = require('./../../services/User.service');

router.post('/verifyIdToken', async (req, res) => {
  try {
    const user = await UserService.verifyGoogleIdToken(req.body);
    if (!user) throw { message: 'Can not verify user' }
    makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], user))
  } catch (e) {
    makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, e.errors[0].message, {}));
  }
});

module.exports = router;
