import { test, expect } from "@playwright/test";
import tripPage from "../pages/CreateTripPage";
import LoginPage from "../pages/loginPage";

test.only("Book one way car", async ({ page }) => {
  await page.goto("/");

  const login = new LoginPage(page);
  await login.getOTP("1916602019");
  await login.extractOTPandFill();
  await page.waitForTimeout(2000);
  //slide down
  await page.evaluate(() => {
    window.scrollBy(0, 300);
  });

  const trip = new tripPage(page);
  await trip.createTrip();
  await page.waitForTimeout(4000);
  await trip.addStopage();
  //slide down
  await page.evaluate(() => {
    window.scrollBy(0, 300);
  });
  await trip.confirmTrip();
  await page.waitForTimeout(4000);
  await trip.checkAndCompleteProfile();
  await trip.confirmTrip();
  await page.pause();
});

//   await page.waitForTimeout(4000);
//   await page.getByRole('button', { name: 'Add Stops' }).click();
//   await page.getByRole('textbox', { name: 'Enter Stoppage Location' }).click();
//   await page.getByRole('textbox', { name: 'Enter Stoppage Location' }).fill('Mawa ghat');
//   await page.getByRole('button', { name: 'Mawa Ghat Fish Market,' }).click();
//   await page.getByRole('button', { name: 'Request Your Trip' }).click();
//   await page.getByRole('button', { name: 'Continue' }).click();
//   await page.getByRole('textbox', { name: 'Name' }).click();
//   await page.getByRole('textbox', { name: 'Name' }).fill('Random Name');
//   await page.getByRole('button', { name: 'Continue', exact: true }).click();
//   await page.getByRole('button', { name: 'Request Your Trip' }).click();
//   await page.goto('http://fe.garibook.com/trip/ongoing-bidding');
// });
