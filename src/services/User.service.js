const { google } = require('googleapis');
const { User } = require('../models');

module.exports = {
  verifyGoogleIdToken: async function ({ idToken, clientId }) {
    const client = new google.auth.OAuth2(clientId);
    const ticket = await client.verifyIdToken({
      idToken,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    const existedUser = await User.findOne({ where: { email: payload.email } });
    if (existedUser) return existedUser;
    const { data: googleUser } = await google.admin('directory_v1').users.get({ userKey: payload.email });
    const user = await User.create(
      {
        email: payload.email,
        idGoogle: googleUser.id,
        role: googleUser.isAdmin ? 'admin' : 'user',
      }
    )
    return user;
  }
}
