const moment = require('moment-timezone');
const config = require('config');

let timeZone = process.env.TIME_ZONE || (config.application || {}).timezone || "Asia/Ho_Chi_Minh";

module.exports = {
    getCurrentTimeAsString: function () {
        return moment().tz(timeZone).format("YYYY-MM-DDThh:mm:ss");
    },
    isTheSameDay: function (day1, day2) {
        return moment(day1).isSame(day2, 'day');
    },
    getCurrentDate: function () {
        return moment().tz(timeZone).format("YYYY-MM-DD");
    }
};
