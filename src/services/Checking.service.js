const models = require('./../models');
//let UserModel = models.User;
let CheckingModel = models.Checking;

const moment = require('moment');

module.exports = {
    checkin: function(idUser) {
        let momentTime = 12;
        return new Promise(async (resolve, reject)=>{
            
        });
    },
    checkout: function(idUser) {

    },
    status: function(idUser) {

    }
}