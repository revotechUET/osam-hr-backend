const models = require('./../models');
//let UserModel = models.User;
let CheckingModel = models.Checking;

const sequelize = require('sequelize');
let Op = sequelize.Op;

const TimeService = require('./Time.service');

module.exports = {
  checkin: function (data) {
    return new Promise((resolve, reject) => {
      let user = data.user;
      let currentDate = TimeService.getCurrentDate();
      CheckingModel.findOne({ where: { date: currentDate, idUser: user.id } }).then(checking => {
        if (checking) {
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
      const reportStatus = data.options.reportStatus || { [Op.regexp]: '.*' }
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
  },
  report: async function ({ user, options: { id, reportContent } }) {
    const checking = await CheckingModel.findOne({ where: { id, idUser: user.id } });
    if (checking) {
      checking.update({ reportContent, reportStatus: 'reported' });
      return checking;
    } else {
      throw { message: "Checking not found" };
    }
  },
}
