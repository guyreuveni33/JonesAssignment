const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser instance
    const browser = await puppeteer.launch({headless: false}); // Set headless: false to see the browser actions
    const page = await browser.newPage();

    // Navigate to the target website, and the filling of the form is being done slowly by the networkidle2 option
    await page.goto('https://testsite.getjones.com/ExampleForm/', {waitUntil: 'networkidle2'});

    // Fill in the Name, Email, Phone, and Company fields
    await page.type('#name', 'Guy Reuveni');
    await page.type('#email', 'guy@gmail.com');
    await page.type('#phone', '1234567890');
    await page.type('#company', 'Jones Software');

    // Bonus: Change the Number of Employees from 1-10 to 51-500
    await page.select('select[name="number_of_employees"]', '51-500');

    // Create a screenshot before clicking the "Request a call back" button
    await page.screenshot({path: 'before_click.png'});

    // Click the "Request a call back" button
    await page.click('button.primary.button');

    // Wait for the thank-you message to appear
    await page.waitForSelector('.thank-you', {timeout: 30000});

    // Log a message upon reaching the thank you page
    console.log('Reached the thank you page');


    // Close the browser
    await browser.close();
})();
