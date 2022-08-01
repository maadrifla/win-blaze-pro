import { getBrowserInstance } from "../models/getBrowserInstance";

const BLAZE_LOGIN_URL = "https://blaze.com/pt/?modal=auth&tab=login&redirect=/pt/account/profile/info";

export const login = async (
  email, password,
) => {
  let browser = await getBrowserInstance();
  let myPage = await browser.newPage();

  let success;

  try {
    await myPage.goto(BLAZE_LOGIN_URL);
    await myPage.type("[name=username]", email);
    await myPage.type("[type=password]", password);
    await myPage.keyboard.press("Enter");

    await myPage.waitForTimeout(5000);

    const handleElement = await myPage.$x(`//*[@id="user-info"]/h1`);
    await myPage.evaluate(element => element.textContent, handleElement[0]);

    success = true;
  } catch (err) {
    success = false;
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  return success;
}
