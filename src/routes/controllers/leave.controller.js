const express = require('express');

const router = express.Router();

const jsonResponse = require('./../helper/response');
const CODE = require('./../helper/response-code');
const makeResponse = require('./../helper/make-response');

const middleWare = require('./../middlewares');

router.post('/add', middleWare.authenticateRequired, (req, res) => {

});

router.post('/get', middleWare.authenticateRequired, (req, res) => {

});

router.post('/approve', middleWare.authenticateRequired, middleWare.requireManager, (req, res) => {

});

router.post('/list', middleWare.authenticateRequired, middleWare.requireManager, (req, res) => {

});

module.exports = router;
