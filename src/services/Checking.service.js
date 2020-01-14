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
            CheckingModel.findOne({where: {
                [Op.and]: [
                    sequelize.where(sequelize.fn('CONVERT', 'DATE', sequelize.col('date')), "=", sequelize.fn('CONVERT', 'DATE', today)),
                    {
                        type: "checkin",
                        idUser: idUser
                    }
                ]
            }})
            .then((rs)=>{
                if (rs) {
                    reject({message: "You already checking today"});
                } else {
                    //create a new checkin
                    CheckingModel.create({
                        idUser: idUser,
                        type: "checkin",
                        note: note,
                        report: report
                    })
                    .then((rs)=>{
                        resolve(rs);
                    })
                    .catch((e)=>{
                        reject(e);
                    });
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