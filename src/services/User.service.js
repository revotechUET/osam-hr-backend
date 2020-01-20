const { google } = require('googleapis');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('config');

const jwtKey = process.env.JWT_KEY || (config.application || {}).jwtKey || "jwtKey";

function genToken(user) {
  return jwt.sign({ id: user.id, idGoogle: user.idGoogle, email: user.email, role: user.role }, jwtKey);
}

module.exports = {
  verifyGoogleIdToken: async function ({ idToken, clientId }) {
    const client = new google.auth.OAuth2(clientId);
    const ticket = await client.verifyIdToken({
      idToken,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    const existedUser = await User.findOne({ where: { email: payload.email } });
    if (existedUser) return genToken(existedUser);
    const { data: googleUser } = await google.admin('directory_v1').users.get({ userKey: payload.email });
    const user = await User.create(
      {
        email: payload.email,
        idGoogle: googleUser.id,
        role: googleUser.isAdmin ? 'admin' : 'user',
      }
    )
    return genToken(user);
  }
}
