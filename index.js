const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();

  // 1. Aternos login
  await page.goto("https://aternos.org/go/");
  await page.type("#user", "YOUR_USERNAME");
  await page.type("#password", "YOUR_PASSWORD");
  await page.click("#login");
  await page.waitForNavigation();

  // 2. Go to server page
  await page.goto("https://aternos.org/server/");
  await page.waitForSelector(".server-body");

  // 3. Click on "Start"
  const startButton = await page.$(".server-body .start");
  if (startButton) {
    await startButton.click();
    console.log("✅ Server start command sent");
  } else {
    console.log("❌ Start button not found. Server may already be running.");
  }

  await browser.close();
})();
