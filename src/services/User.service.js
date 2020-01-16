const models = require('../models');
let UserModel = models.User;

const md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('config');

let jwtKey = process.env.JWT_KEY || (config.application || {}).jwtKey || "jwtKey";

function createUser(info) {
  if (info.password) info.password = md5(info.password);
  return UserModel.create(info).then((result) => { result.password = null; return result; });
}

module.exports = {
  verifyLogin: async function (info) {
    if (info.password) info.password = md5(info.password);
    let userInfo = await UserModel.findOne({ where: { username: info.username } });
    if (userInfo) {
      if (info.password == userInfo.password) {
        let token = jwt.sign({ idUser: userInfo.idUser, role: userInfo.role, username: userInfo.username }, jwtKey);
        return token;
      } else {
        throw { message: "Password is not match" };
      }
    } else {
      throw { message: "User not exist" };
    }
  },
}
