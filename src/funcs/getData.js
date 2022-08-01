import { getBrowserInstance } from "../models/getBrowserInstance";

const BLAZE_URL_API = "https://blaze.com/api/roulette_games/recent"; 

const getData = async () => {
  let browser = await getBrowserInstance();
  let page = await browser.newPage();

  await page.goto(BLAZE_URL_API);
  
  let results = [];

  let tries = 0;
  await (async function tryGetData() {
    try {
      await page.reload();
      
      let data = [];
      const handleElement = await page.$x('/html/body/pre');
      data = await page.evaluate(el => el.textContent, handleElement[0]);
      data = JSON.parse(data);

      for (let index = 0; index < 20; index++) { 
        results.push(data[index].color);
      }
    } catch {
      tries++;

      if (tries < 3) tryGetData();
      else {} // desligar bot no banco de dados
    }
  })();

  await browser.close();

  return results;
}

export { getData };
