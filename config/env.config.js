require('dotenv').config({ quiet: true });
const fs = require('fs');
const path = require('path');

const envName = (process.env.ENV || 'qa').toLowerCase();
const envFile = path.join(__dirname, 'environment', `${envName}.json`);

if (!fs.existsSync(envFile)) {
  throw new Error(`Unknown environment "${envName}". Use ENV=dev|qa|staging.`);
}

const fileConfig = JSON.parse(fs.readFileSync(envFile, 'utf8'));
const fromEnv = (key, fallback = '') => process.env[key] || fallback;

module.exports = {
  envName,
  clientUrl: fromEnv('CLIENT_URL', fileConfig.clientUrl),
  apiBaseUrl: fromEnv('API_BASE_URL', fileConfig.apiBaseUrl),
  practiceLoginUrl: fromEnv('PRACTICE_LOGIN_URL', fileConfig.practiceLoginUrl),
  practicePageUrl: fromEnv('PRACTICE_PAGE_URL', fileConfig.practicePageUrl),
  calendarUrl: fromEnv('CALENDAR_URL', fileConfig.calendarUrl),
  angularFormUrl: fromEnv('ANGULAR_FORM_URL', fileConfig.angularFormUrl),
  clientEmail: fromEnv('CLIENT_EMAIL'),
  clientPassword: fromEnv('CLIENT_PASSWORD'),
  practiceUsername: fromEnv('PRACTICE_USERNAME'),
  practicePassword: fromEnv('PRACTICE_PASSWORD'),
  productId: fromEnv('PRODUCT_ID', fileConfig.productId),
};
