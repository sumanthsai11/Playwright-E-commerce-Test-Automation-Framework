const fs = require('fs');
const path = require('path');

const logsDir = path.join(process.cwd(), 'logs');
const logFile = path.join(logsDir, 'test.log');

function timestamp() {
  return new Date().toISOString();
}

function write(level, message) {
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
  const line = `[${timestamp()}] [${level}] ${message}\n`;
  fs.appendFileSync(logFile, line);
  if (level === 'ERROR') {
    console.error(line.trim());
  } else {
    console.log(line.trim());
  }
}

const logger = {
  info: (message) => write('INFO', message),
  warn: (message) => write('WARN', message),
  error: (message) => write('ERROR', message),
  debug: (message) => write('DEBUG', message),
};

module.exports = { logger };
