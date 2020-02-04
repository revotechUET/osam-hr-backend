const models = require("../models");
const LeaveModel = models.Leave;
const Op = require('sequelize').Op;

module.exports = {
  add: function (data) {
    return new Promise((resolve, reject) => {
      LeaveModel.create({
        idRequester: data.user.id,
        startTime: data.options.startTime,
        endTime: data.options.endTime,
        reason: data.options.reason,
        description: data.options.description
      }).then(resolve).catch(reject)
    })
  },
  get: function (data) {
    return new Promise((resolve, reject) => {
      LeaveModel.findOne({ where: { id: data.options.id, idRequester: data.user.id } }).then(lm => {
        if (lm) {
          resolve(lm);
        } else {
          reject("No record found by id");
        }
      }).catch(reject)
    })
  },
  approve: function (data) {
    return new Promise((resolve, reject) => {
      LeaveModel.findByPk(data.options.id).then(lm => {
        if (lm) {
          lm.status = 'approved';
          lm.idApprover = data.user.id;
          lm.save().then(resolve).catch(reject);
        } else {
          reject("No record found by id");
        }
      }).catch(reject)
    })
  },
  list: function (data) {
    return new Promise((resolve, reject) => {
      let options = data.options.getAll ? {} : {idRequester: data.user.id};
      LeaveModel.findAll({where: options}).then(resolve);
    })
  },
  reject: function (data) {
    return new Promise((resolve, reject) => {
      LeaveModel.findByPk(data.options.id).then(lm => {
        if (lm) {
          lm.status = "rejected";
          lm.idApprover = data.user.id;
          lm.save().then(resolve).catch(reject);
        } else {
          reject("No record found by id");
        }
      }).catch(err => {
        reject(err);
      })
    })
  },
  delete: function (data) {
    return new Promise((resolve, reject) => {
      LeaveModel.findByPk(data.options.id).then(lm => {
        if (lm) {
          lm.destroy().then(resolve).catch(reject)
        } else {
          reject("No record found by id");
        }
      }).catch(reject)
    })
  }
};
