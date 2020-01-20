const models = require('./../models');
//let UserModel = models.User;
let CheckingModel = models.Checking;

const sequelize = require('sequelize');
let Op = sequelize.Op;

const TimeService = require('./Time.service');

module.exports = {
  // checkin: function (id, note, report) {
  //     let today = TimeService.getCurrentTimeAsString();
  //     return new Promise((resolve, reject) => {
  //         //check if there is a checkin alreadytoday
  //         CheckingModel.findAll({
  //             where: {
  //                 id: id,
  //                 type: 'checkin'
  //             }
  //         })
  //         .then((rs) => {
  //             let nonCheckin = true;
  //             for (let i = 0; i < rs.length; i++) {
  //                 if (TimeService.isTheSameDay(rs[i].date, today)) nonCheckin = false;
  //             }
  //             if (nonCheckin) {
  //                 CheckingModel.create({
  //                     id: id,
  //                     note: note,
  //                     report: report,
  //                     type: "checkin"
  //                 })
  //                     .then((rs) => {
  //                         resolve(rs);
  //                     })
  //                     .catch((e) => {
  //                         reject(e);
  //                     });
  //             } else {
  //                 reject({ message: "You already checkin today" });
  //             }
  //         })
  //         .catch((e) => {
  //             reject(e);
  //         });
  //     });
  // },
  checkin: function (data) {
    return new Promise((resolve, reject) => {
      let user = data.user;
      let currentDate = TimeService.getCurrentDate();
      CheckingModel.findOne({ where: { date: currentDate, idUser: user.id } }).then(checking => {
        if (checking) {
          console.log("You already checkin today");
          reject({ message: "You already checkin today" });
        } else {
          CheckingModel.create({
            date: currentDate,
            idUser: user.id
          }).then(r => {
            resolve(r);
          }).catch(err => {
            console.log("Checkin error ", err);
            reject(err);
          });
        }
      })
    });
  },
  checkout: function (data) {
    return new Promise((resolve, reject) => {
      let user = data.user;
      let currentDate = TimeService.getCurrentDate();
      CheckingModel.findOne({ where: { date: currentDate, idUser: user.id } }).then(_user => {
        if (_user) {
          _user.checkoutTime = Date.now();
          _user.save().then(r => {
            resolve(r);
          }).catch(err => {
            console.log("Checkout faied ", err);
            reject(err);
          })
        } else {
          reject({ message: "You are not checked in today" });
        }
      }).catch(e => {
        console.log("Checkout faied ", e);
      });
    })
  },
  // checkout: function (id, note, report) {
  //     let today = TimeService.getCurrentTimeAsString();
  //     return new Promise((resolve, reject) => {
  //         //check if there is a checkin alreadytoday
  //         CheckingModel.findAll({
  //             where: {
  //                 id: id
  //             }
  //         })
  //             .then((rs) => {
  //                 let isCheckin = false;
  //                 for (let i = 0; i < rs.length; i++) {
  //                     if (TimeService.isTheSameDay(rs[i].date, today) && rs[i].type == "checkin") isCheckin = true;
  //                 }
  //                 if (isCheckin) {
  //                     let nonCheckin = true;
  //                     for (let i = 0; i < rs.length; i++) {
  //                         if (TimeService.isTheSameDay(rs[i].date, today) && rs[i].type == "checkout") nonCheckin = false;
  //                     }
  //                     if (nonCheckin) {
  //                         CheckingModel.create({
  //                             id: id,
  //                             note: note,
  //                             report: report,
  //                             type: "checkout"
  //                         })
  //                             .then((rs) => {
  //                                 resolve(rs);
  //                             })
  //                             .catch((e) => {
  //                                 reject(e);
  //                             });
  //                     } else {
  //                         reject({ message: "You already checkout today" });
  //                     }
  //                 } else {
  //                     reject({ message: "You didnt checkin today. Can not checkout" });
  //                 }
  //             })
  //             .catch((e) => {
  //                 reject(e);
  //             });
  //     });
  // },
  status: function (data) {
    return new Promise((resolve, reject) => {
      let currentDate = TimeService.getCurrentDate();
      let user = data.user;
      CheckingModel.findOne({ where: { date: currentDate, idUser: user.id } }).then(_user => {
        if (_user) {
          // da checkin
          if (_user.checkoutTime) {
            // da checkout
            resolve({ status: 2 });
          } else {
            resolve({ status: 1 });
          }
        } else {
          // chua checkin
          resolve({ status: 0 });
        }
      }).catch(err => {
        console.log("Get status error ", err);
        reject(err);
      })
    })
  },
  list: function (data) {
    return new Promise((resolve, reject) => {
      const user = data.user;
      const fromDate = data.options.fromDate || "2000-01-01";
      const toDate = data.options.toDate || "2900-01-01";
      const reportStatus = data.options.reportStatus || {[Op.regexp]: '.*'}
      const query = { idUser: user.id, reportStatus: reportStatus, date: { [Op.between]: [fromDate, toDate] } }
      CheckingModel.findAll({
        where: query
      }).then(rs => {
        resolve(rs);
      }).catch(err => {
        console.log(err);
        reject(err);
      })
    })
  }
}
