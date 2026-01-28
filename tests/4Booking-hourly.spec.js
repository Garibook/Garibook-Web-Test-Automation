import { test, expect } from "@playwright/test";
import tripPage from "../pages/CreateTripPage";
import LoginPage from "../pages/loginPage";
import { getMobile } from "../utils/mobileDataRead";

test.describe.serial("Book hourly car flow test", () => {
  test("Book Car hourly successfully", async ({ page }) => {
    await page.goto("/");
    const login = new LoginPage(page);
    const mobile = getMobile("mobile5");
    await login.getOTP(mobile);
    await login.extractOTPandFill();
    await page.waitForTimeout(2000);
    //slide down
    await page.evaluate(() => {
      window.scrollBy(0, 300);
    });

    const hourlyTrip = new tripPage(page);
    await hourlyTrip.createHourlyTrip();
    await page.waitForTimeout(4000);
    //slide down
    await page.evaluate(() => {
      window.scrollBy(0, 300);
    });
    await hourlyTrip.additionalInfoFill();
    await hourlyTrip.confirmTrip();
    await page.waitForTimeout(3000);
    await hourlyTrip.checkAndCompleteProfile();
    //Assertion for trip created successfully
    await expect(page.locator(".swal2-popup .swal2-html-container")).toHaveText(
      "Trip created successfuly",
    );
  });
  test("User should not be able to Book Car Hourly if trip exist", async ({
    page,
  }) => {
    await page.goto("/");
    const login = new LoginPage(page);
    const mobile = getMobile("mobile5");
    await login.getOTP(mobile);
    await login.extractOTPandFill();
    await page.waitForTimeout(2000);
    //slide down
    await page.evaluate(() => {
      window.scrollBy(0, 300);
    });

    const hourlyTrip = new tripPage(page);
    await hourlyTrip.createHourlyTrip();
    await page.waitForTimeout(4000);
    //slide down
    await page.evaluate(() => {
      window.scrollBy(0, 300);
    });
    await hourlyTrip.additionalInfoFill();
    await hourlyTrip.confirmTrip();
    await page.waitForTimeout(3000);
    await hourlyTrip.checkAndCompleteProfile();
    //Assertion for trip created successfully
    await expect(page.locator(".swal2-popup .swal2-html-container")).toHaveText(
      "You have ongoing trips. Please complete the trips before starting a new one.",
    );
  });
});
