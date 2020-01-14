const models = require('./../models');
//let UserModel = models.User;
let CheckingModel = models.Checking;

const sequelize = require('sequelize');
let Op = sequelize.Op;

const TimeService = require('./Time.service');

module.exports = {
    checkin: function(idUser, note, report) {
        let today = TimeService.getCurrentTimeAsString();
        return new Promise(async (resolve, reject)=>{
            //check if there is a checkin alreadytoday
            CheckingModel.findAll({where: {
                idUser: idUser
            }})
            .then((rs) => {
                let nonCheckin = true;
                for (let i = 0; i < rs.length; i++) {
                    if (TimeService.isTheSameDay(rs[i].date, today)) nonCheckin = false;
                }
                if (nonCheckin) {
                    CheckingModel.create({
                        idUser: idUser,
                        note: note,
                        report: report
                    })
                    .then((rs)=>{
                        resolve(rs);
                    })
                    .catch((e)=>{
                        reject(e);
                    });
                } else {
                    reject({message: "You already checkin today"});
                }
            })
            .catch((e)=>{
                reject(e);
            })
        });
    },
    checkout: function(idUser) {

    },
    status: function(idUser) {

    }
}