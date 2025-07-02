const puppeteer = require('puppeteer');

const ATERNOS_USERNAME = 'dttyagi';
const ATERNOS_PASSWORD = 'your_password'; // 👈 yahan apna Aternos ka password daalo

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('https://aternos.org/go');

  // Login page
  await page.goto('https://aternos.org/login/');
  await page.type('#user', ATERNOS_USERNAME);
  await page.type('#password', ATERNOS_PASSWORD);
  await page.click('#login > button');

  await page.waitForNavigation();

  // Go to server page
  await page.goto('https://aternos.org/server/');

  // Click start
  await page.waitForSelector('.server-status.online, .server-status.offline', { timeout: 10000 });
  const status = await page.$eval('.server-status', el => el.textContent.trim());

  if (status === 'Offline') {
    console.log('🟡 Server is offline. Starting now...');
    await page.click('#start');
    await page.waitForTimeout(10000);
  } else {
    console.log('✅ Server already online.');
  }

  await browser.close();
})();
