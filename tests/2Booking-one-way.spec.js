import { test, expect } from "@playwright/test";
import tripPage from "../pages/CreateTripPage";
import LoginPage from "../pages/loginPage";

test("Book one way car", async ({ page }) => {
  await page.goto("/");
  const login = new LoginPage(page);

  await login.getOTP("1916602020");
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
  await page.waitForTimeout(3000);
  await trip.checkAndCompleteProfile();
  //await trip.confirmTrip();
  await page.waitForTimeout(2000);
  //Assertion for trip created successfully
  await expect(page.locator(".swal2-popup .swal2-html-container")).toHaveText(
    "Trip created successfuly",
  );
});
test("User should not able to Book one way car if trip already exist", async ({
  page,
}) => {
  await page.goto("/");
  const login = new LoginPage(page);

  await login.getOTP("1916602020");
  await login.extractOTPandFill();
  await page.waitForTimeout(2000);
  //slide down
  await page.evaluate(() => {
    window.scrollBy(0, 300);
  });

  const trip = new tripPage(page);
  await trip.createTrip();
  await page.waitForTimeout(3000);
  await trip.addStopage();
  //slide down
  await page.evaluate(() => {
    window.scrollBy(0, 300);
  });
  await trip.confirmTrip();
  await page.waitForTimeout(3000);
  await trip.checkAndCompleteProfile();
  //await trip.confirmTrip();
  await page.waitForTimeout(2000);
  await expect(page.locator(".swal2-popup .swal2-html-container")).toHaveText(
    "You have ongoing trips. Please complete the trips before starting a new one.",
  );
});
