import { test, expect } from '@playwright/test';
import tripPage from '../pages/CreateTripPage';
import LoginPage from '../pages/loginPage';

test.only('Book one way car', async ({ page }) => {
  await page.goto("/");
   await page.mouse.wheel(0, 400);
  const login = new LoginPage(page);
  await login.getOTP('1916603017');
  await login.extractOTPandFill();
  await page.waitForTimeout(2000);
 
    await tripPage.createTrip();
})



// test('test', async ({ page }) => {
//   await page.goto('http://fe.garibook.com/');
//   await page.mouse.wheel(0, 400);
//   await page.getByRole('button', { name: 'Select Car Type' }).click();
//   await page.getByRole('button', { name: 'Sedan Premium 4 Seats' }).click();
//   await page.getByRole('textbox', { name: 'Enter Pickup Location' }).click();
//   await page.getByRole('textbox', { name: 'Enter Pickup Location' }).fill('niketon');
//   await page.getByRole('button', { name: 'NIKETON , GULSHAN, Road' }).click();
//   await page.getByRole('textbox', { name: 'Enter Drop-off Location' }).click();
//   await page.getByRole('textbox', { name: 'Enter Drop-off Location' }).fill('khulna');
//   await page.getByRole('button', { name: 'Khulna University, Sher-E-' }).click();
//   await page.getByRole('textbox', { name: 'MM/DD/YYYY 00:00 PM' }).click();
//   await page.getByRole('option', { name: 'Choose Tuesday, January 27th,' }).click();
//   await page.getByRole('option', { name: '10:00 AM' }).click();
//   await page.getByRole('button', { name: 'Continue' }).click();
//    await page.getByRole('button', { name: 'Continue', exact: true }).click();
//    await page.waitForTimeout(4000);
//   await page.getByRole('textbox', { name: '1 (702) 123-' }).click();
//   await page.getByRole('textbox', { name: '1 (702) 123-' }).fill('+880 191 660 2003');
//   await page.getByRole('button', { name: 'Send Code' }).click();
//   await page.locator('input[name="otp1"]').fill('6');
//   await page.locator('input[name="otp2"]').fill('6');
//   await page.locator('input[name="otp3"]').fill('8');
//   await page.locator('input[name="otp4"]').fill('3');
//   await page.getByRole('button', { name: 'Continue', exact: true }).click();
//   await page.getByRole('button', { name: 'Continue button-icon' }).click();
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