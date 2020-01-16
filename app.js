const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('config');

const app = express();

app.use(bodyParser.json());

//cors
app.use(cors());

const middlewares = require('./src/routes/middlewares');

//token checker
app.use(middlewares.tokenChecker);

const PORT = process.env.APP_PORT || (config.application || {}).port || 3000;

const userController = require('./src/routes/controllers/user.controller');
const checkingController = require('./src/routes/controllers/checking.controller');

app.use('/user', userController);
app.use('/checking', checkingController);

app.listen(PORT, ()=>{
    console.log('App start listening on port', PORT);
});
