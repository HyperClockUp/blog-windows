const path = require('path');

const isDevelopment = process.env.NODE_ENV === 'development';

const isProduction = process.env.NODE_ENV === 'production';

const PROJECT_PATH = path.resolve(__dirname, '../');

const SERVER_PORT = 8080;

const SERVER_HOST = '0.0.0.0';

module.exports = {
  isDevelopment,
  isProduction,
  PROJECT_PATH,
  SERVER_PORT,
  SERVER_HOST,
}