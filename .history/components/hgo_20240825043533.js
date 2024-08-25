const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navigate to the form page
    await page.goto('https://sample-form-e2b82.web.app/');

    // Wait for the page to fully load
   // await page.waitForTimeout(3000); // Adjust timeout based on page loading time if necessary

    // Retrieve the HTML content of the page
    const htmlContent = await page.content();
    console.log(htmlContent);

    // The browser remains open for inspection
    // If you want to close the browser after getting the HTML, uncomment the next line
    // await browser.close();
})();
