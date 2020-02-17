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
      //args: ['--no-sandbox'],
      headless: true
    });

    const page = await browser.newPage();
    await page.setViewport({width: 800, height: 800, deviceScaleFactor: 1});

    await page.goto(`data:text/html;charset=UTF-8,${html}`, {
      waitUntil: 'networkidle0'
    });

    const selector = '#section-to-print';

    const rect = await page.evaluate(selector => {
      const element = document.querySelector(selector);
      const {x, y, width, height} = element.getBoundingClientRect();
      return {left: x, top: y, width, height, id: element.id};
    }, selector);

    var milis = new Date();
    milis = milis.getTime();
  
    await page.screenshot({
      path:`${path.join(__dirname, 'tmp')}/${milis}.png`,
      clip: {x: 0, y: 0, width: rect.width, height: rect.height},
      // Não funciona para PNG VERIFICAR
      //quality: 100, 
    });

    await browser.close();
    return true;
  }
};

export default new Screenshot();