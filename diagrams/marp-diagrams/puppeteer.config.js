const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
}; 