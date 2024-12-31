import puppeteer from 'puppeteer';
import fs from 'fs';

(async() =>{
    // create a browser instance
    const browser = await puppeteer.launch({
        headless: true
    });

    // create a new page
    const page = await browser.newPage();

    // GEt HTML content from HTML file
    const html = fs.readFileSync('emrv-each-template.html','utf-8');
    await page.setContent(html, {waitUntil: 'domcontentloaded'});

    await page.waitForSelector('.report-header'); // Example selector to ensure the page is ready
    await page.waitForTimeout(3000); 

    await page.setViewport({ width: 1200, height: 800 });

    // TO reflect CSS used for screens instead of print
    await page.emulateMediaType('screen');

    // Downlod the PDF
    const pdf = await page.pdf({
        path: 'emrv-report2.pdf',
        margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
        printBackground: true,
        format: 'A4',
        preferCSSPageSize: true,
    })

    // Close the browser instance
    await browser.close();
    
})();
