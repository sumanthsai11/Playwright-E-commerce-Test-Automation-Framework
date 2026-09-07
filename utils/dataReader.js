const fs = require('fs');
const path = require('path');

function readJson(relativePath) {
  const fullPath = path.isAbsolute(relativePath)
    ? relativePath
    : path.join(process.cwd(), relativePath);
  return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
}

module.exports = { readJson };
