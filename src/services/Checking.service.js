const models = require('./../models');
//let UserModel = models.User;
let CheckingModel = models.Checking;

const sequelize = require('sequelize');
let Op = sequelize.Op;

const TimeService = require('./Time.service');

module.exports = {
    checkin: function (idUser, note, report) {
        let today = TimeService.getCurrentTimeAsString();
        return new Promise(async (resolve, reject) => {
            //check if there is a checkin alreadytoday
            CheckingModel.findAll({
                where: {
                    idUser: idUser,
                    type: 'checkin'
                }
            })
            .then((rs) => {
                let nonCheckin = true;
                for (let i = 0; i < rs.length; i++) {
                    if (TimeService.isTheSameDay(rs[i].date, today)) nonCheckin = false;
                }
                if (nonCheckin) {
                    CheckingModel.create({
                        idUser: idUser,
                        note: note,
                        report: report,
                        type: "checkin"
                    })
                        .then((rs) => {
                            resolve(rs);
                        })
                        .catch((e) => {
                            reject(e);
                        });
                } else {
                    reject({ message: "You already checkin today" });
                }
            })
            .catch((e) => {
                reject(e);
            });
        });
    },
    checkout: function (idUser, note, report) {
        let today = TimeService.getCurrentTimeAsString();
        return new Promise(async (resolve, reject) => {
            //check if there is a checkin alreadytoday
            CheckingModel.findAll({
                where: {
                    idUser: idUser
                }
            })
            .then((rs) => {
                let isCheckin = false;
                for (let i = 0; i < rs.length; i++) {
                    if (TimeService.isTheSameDay(rs[i].date, today) && rs[i].type == "checkin") isCheckin = true;
                }
                if (isCheckin) {
                    let nonCheckin = true;
                    for (let i = 0; i < rs.length; i++) {
                        if (TimeService.isTheSameDay(rs[i].date, today) && rs[i].type == "checkout") nonCheckin = false;
                    }
                    if (nonCheckin) {
                        CheckingModel.create({
                            idUser: idUser,
                            note: note,
                            report: report,
                            type: "checkout"
                        })
                            .then((rs) => {
                                resolve(rs);
                            })
                            .catch((e) => {
                                reject(e);
                            });
                    } else {
                        reject({ message: "You already checkout today" });
                    }
                } else {
                    reject({message: "You didnt checkin today. Can not checkout"});
                }
            })
            .catch((e) => {
                reject(e);
            });
        });
    },
    status: function (idUser) {
        let today = TimeService.getCurrentTimeAsString();
        return new Promise(async (resolve, reject) => {
            CheckingModel.findAll({
                where: {
                    idUser: idUser
                }
            })
            .then((rs)=>{
                let res = {
                    checkin: false,
                    checkout: false
                };
                for (let i = 0; i < rs.length; i++) {
                    if (TimeService.isTheSameDay(rs[i].date, today)) {
                        if (rs[i].type == "checkin") {
                            res.checkin = true;
                            if (res.checkout) break;
                        } else if (rs[i].type == "checkout") {
                            res.checkout = true;
                            if (res.checkin) break;
                        }
                    }
                }
                resolve(res);
            })
            .catch(e=>{
                reject(e);
            });
        });
    }
}