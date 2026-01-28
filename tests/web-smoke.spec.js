import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage'; 
import { getMobile } from '../utils/mobileDataRead';

test('Garibook Page Navigation Smoke Test with 10s Delay', async ({ page }, testInfo) => {
  
  test.setTimeout(180000); 

  await page.goto('https://fe.garibook.com/');

  const navLinks = [
    { name: 'About Us' },
    { name: 'Earn With Garibook' },
    { name: 'Garibook Business', exact: true },
    { name: 'Garibook Club', exact: true },
    { name: 'Campaign' },
    { name: 'Blogs' }
  ];

  const navbar = page.locator('nav'); 

  for (const linkInfo of navLinks) {
    const link = navbar.getByRole('link', linkInfo);
    
    await link.scrollIntoViewIfNeeded();
    await link.click();
    console.log(`Clicked and viewing: ${linkInfo.name}`);

    
    await page.waitForTimeout(5000); 

   
    await page.evaluate(async () => {
      window.scrollBy({ top: 5000, behavior: 'smooth' });
    });

   
    await page.waitForTimeout(2000);
  }

  // Login ---
  console.log('Navigating to Home for Login...');
  await page.goto('https://fe.garibook.com/');
  
  const login = new LoginPage(page);
  const mobile = getMobile("mobile1");

  await login.getOTP(mobile);
  await login.extractOTPandFill();

  
  await page.waitForTimeout(5000);
});