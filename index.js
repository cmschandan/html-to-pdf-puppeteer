import puppeteer from 'puppeteer';

(async() =>{

    // create a browser instance
    const browser = await puppeteer.launch();

    // create a new page
    const page = await browser.newPage();

    // website url to export as a pdf
    const website_url = 'https://varunamarine.eu/';

    // open URL in current page
    await page.goto(website_url, { waitUntil: 'networkidle0'});

    // TO reflect CSS used for screens instead of print

    await page.emulateMediaType('screen');

    // Downlod the PDF
    const pdf = await page.pdf({
        path: 'result-cyberwaves.pdf',
        margin: {top: '100px', right: '50px', bottom: '100px', left: '50px'},
        format: 'A4',
    });

    // Close the browser instance
    await browser.close();
})();


