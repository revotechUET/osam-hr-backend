const express = require('express');

const router = express.Router();

const jsonResponse = require('./../helper/response');
const CODE = require('./../helper/response-code');
const makeResponse = require('./../helper/make-response');

const middleWare = require('./../middlewares');

router.post('/send', middleWare.authenticateRequired ,(req, res)=>{

});

router.post('/get', middleWare.authenticateRequired ,(req, res)=>{

});

router.post('/approve', middleWare.authenticateRequired, middleWare.roleAtLeastOne, (req, res)=>{

});

router.post('/list', middleWare.authenticateRequired, middleWare.roleAtLeastOne, (req, res)=>{

});

module.exports = router;