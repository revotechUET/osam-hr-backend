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
router.post('/checkin', middleWare.authenticateRequired, (req, res) => {
  CheckingService.checkin({ user: req.user }).then(rs => {
    makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], rs));
  }).catch(err => {
    makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, err.message, {}));
  })
});

/*
    req.body: {
        note,
        report
    }
*/
router.post('/checkout', middleWare.authenticateRequired, (req, res) => {
  let id = req.user.id;
  CheckingService.checkout({user: req.user})
    .then((rs) => {
      makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], rs));
    })
    .catch(e => {
      makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, e.message, {}));
    });
});

/*
    NULL
*/
router.post('/status', middleWare.authenticateRequired, (req, res) => {
  CheckingService.status({ user: req.user })
    .then((rs) => {
      makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], rs));
    })
    .catch(e => {
      makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, e.message, {}));
    });
});


router.post('/list', middleWare.authenticateRequired, (req, res) => {
  CheckingService.list({ user: req.user, options: req.body }).then(rs => {
    makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], rs));
  }).catch(err => {
    makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, err.message, {}));
  })
})

router.post('/report', middleWare.authenticateRequired, (req, res) => {
  CheckingService.report({ user: req.user, options: req.body }).then(rs => {
    makeResponse(res, jsonResponse(CODE.SUCCESS, CODE[CODE.SUCCESS], rs));
  }).catch(err => {
    makeResponse(res, jsonResponse(CODE.GENERIC_ERROR, err.message, {}));
  })
});

module.exports = router;
