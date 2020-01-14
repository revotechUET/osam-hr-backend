const moment = require('moment-timezone');

console.log(moment().tz('Asia/Ho_Chi_Minh').format("YYYY-MM-DDThh:mm:ss"));