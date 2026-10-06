const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    // English home
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'en-home.png', fullPage: true });

    // Arabic home
    await page.goto('http://localhost:3000/ar', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'ar-home.png', fullPage: true });

    // Arabic Services
    await page.goto('http://localhost:3000/ar/services', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'ar-services.png', fullPage: true });
    
    // English Services
    await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'en-services.png', fullPage: true });

    await browser.close();
    console.log("Screenshots captured successfully.");
  } catch (err) {
    console.error("Screenshot error:", err);
  }
})();
