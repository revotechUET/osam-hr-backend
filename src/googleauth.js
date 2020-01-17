const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = [
  'https://www.googleapis.com/auth/admin.directory.user'
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

let client;
async function startAuth(credentials) {
  client = await new Promise(resolve => authorize(credentials, resolve));
  google.options({
    auth: client
  })
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials;
  const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        hd: 'esstar.com.vn',
      });
      console.log(`Authenticate G-Suite admin account by visiting:\n${authUrl}`);
      callback(oauth2Client);
    } else {
      oauth2Client.setCredentials(JSON.parse(token));
      callback(oauth2Client);
    }
  });
}


function getToken(code) {
  client.getToken(code, (err, token) => {
    if (err) return console.error('Error retrieving access token', err);
    client.credentials = token;
    storeToken(token);
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) return console.warn(`Token not stored to ${TOKEN_PATH}`, err);
    console.log(`Token stored to ${TOKEN_PATH}`);
  });
}

module.exports = {
  startAuth,
  getToken
}
