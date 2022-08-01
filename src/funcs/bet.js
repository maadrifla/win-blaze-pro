import { getBrowserInstance } from "../models/getBrowserInstance";

// Acompanhar saldo durante apostas

const BLAZE_LOGIN_URL = "https://blaze.com/pt/?modal=auth&tab=login&redirect=/pt/account/profile/info"; 
const BLAZE_DOUBLE_URL = "https://blaze.com/pt/games/double"; 

const bet = async (
  email, password,
  entryValue, betOn,
  gales, galeMultiplier,
  protectOnWhite = 0,
  catalogMode,
) => {
  let browser = await getBrowserInstance();
  let page = await browser.newPage();

  await page.goto(BLAZE_LOGIN_URL);
  await page.type("[name=username]", email);
  await page.type("[type=password]", password);
  await page.keyboard.press("Enter");

  await page.waitForTimeout(5000);
  
  await page.goto(BLAZE_DOUBLE_URL);
  await page.reload();

  const bets = ["white ", "red ", "black "];
  if (betOn !== 1) await page.click(`[class="${bets[betOn]}"]`);
  await page.type(`[type="number"]`, entryValue.toString());
  let handleElement = await page.$x(`//*[@id="roulette-controller"]/div[1]/div[3]/button`);
  let confirmButton = await page.evaluate(element => element.textContent, handleElement[0]);
  while (confirmButton === 'Esperando') {
    confirmButton = await page.evaluate(element => element.textContent, handleElement[0]);
  }
  if (!catalogMode) await page.click(`[class="place-bet"]`);

  if (protectOnWhite) {
    await page.click(`[class="${bets[0]}"]`);
    await page.type(`[type="number"]`, protectOnWhite.toString());
    let handleElement = await page.$x(`//*[@id="roulette-controller"]/div[1]/div[3]/button`);
    let confirmButton = await page.evaluate(element => element.textContent, handleElement[0]);
    while (confirmButton === 'Esperando') {
      confirmButton = await page.evaluate(element => element.textContent, handleElement[0]);
    }
    if (!catalogMode) await page.click(`[class="place-bet"]`);
  }

  await browser.close();
}

export { bet };
