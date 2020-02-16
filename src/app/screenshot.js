import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import handlebars from 'handlebars';

class Screenshot {
  async renderTamplate(data){
    const templateHtml = fs.readFileSync(path.join(__dirname, 'views/club-adhesion.hbs'), 'utf8');
    const template = handlebars.compile(templateHtml);
    const html = template(data);
    return html;
  }

  async doPrintScreen(html) {
    const browser = await puppeteer.launch({  
      args: ['--no-sandbox'],
      headless: true
    });

    const page = await browser.newPage();
    
    await page.goto(`data:text/html;charset=UTF-8,${html}`, {
      waitUntil: 'networkidle0'
    });

    var milis = new Date();
    milis = milis.getTime();
  
    await page.screenshot({
      fullPage: true,
      path:`${path.join(__dirname, 'tmp')}/${milis}.png`
    });

    await browser.close();
    return true;
  }
};



export default new Screenshot();