const config = require('config');

module.exports = {
  "development": config.get('mysql'),
  "production": config.get('mysql'),
}
