const express = require('express');

const router = express.Router();

const jsonResponse = require('./../helper/response');
const CODE = require('./../helper/response-code');

const middleWare = require('./../middlewares');

const UserService = require('./../../services/User.service');

router.post('/checkin', middleWare.authenticateRequired, (req,res)=>{
    
});

router.post('/checkout', middleWare.authenticateRequired, (req,res)=>{
    
});