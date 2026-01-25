// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Garibook - City to City/);
});

test.only('Login and verify OTP', async ({ page }) => {
  await page.goto("/");

  
  await page.getByRole('link', { name: 'login' }).click();
   await page.waitForTimeout(2000);
  await page.locator('input[name="mobile"]').fill('1916603029');
  await page.waitForTimeout(2000);
  await page.getByRole('button', {name: 'Send code'}).click();


const text = await page.locator('.alert-info').innerText();

// @ts-ignore
const otp = text.match(/\d+/)[0];
console.log(otp);

for (let i = 0; i < otp.length; i++) {
  await page.fill(`#otp${i + 1}`, otp[i]);
}

await page.getByRole('button', { name: 'Continue', exact: true }).click();


//assert that login was successful
const toast = page.locator('.toast-success');

// Wait for toast to be visible
await expect(page.getByText('Logged In Successfully')).toBeVisible();

});
