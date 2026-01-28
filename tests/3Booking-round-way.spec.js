import { test, expect } from "@playwright/test";
import tripPage from "../pages/CreateTripPage";
import LoginPage from "../pages/loginPage";
import { getMobile } from "../utils/mobileDataRead";

test.describe.serial("Login & round-way Trip create flow test", () => {
  test("Book Round way car successfully", async ({ page }) => {
    await page.goto("/");
    const login = new LoginPage(page);
    const mobile = getMobile("mobile4");
    await login.getOTP(mobile);
    await login.extractOTPandFill();
    await page.waitForTimeout(2000);
    //slide down
    await page.evaluate(() => {
      window.scrollBy(0, 300);
    });
    const tripRound = new tripPage(page);
    await tripRound.createRoundTrip();
    await page.waitForTimeout(4000);
    //await tripRound.addStopage();
    //slide down
    await page.evaluate(() => {
      window.scrollBy(0, 300);
    });
    await tripRound.confirmTrip();
    await page.waitForTimeout(3000);
    await tripRound.checkAndCompleteProfile();
    //await trip.confirmTrip();
    await page.waitForTimeout(2000);
    //Assertion for trip created successfully
    await expect(page.locator("#swal2-html-container")).toHaveText(
      "Trip created successfuly",
    );
  });
  test("User should not be able to Book Round way car if trip already exist", async ({
    page,
  }) => {
    await page.goto("/");
    const login = new LoginPage(page);
    const mobile = getMobile("mobile4");
    await login.getOTP(mobile);
    await login.extractOTPandFill();
    await page.waitForTimeout(2000);
    //slide down
    await page.evaluate(() => {
      window.scrollBy(0, 300);
    });
    const tripRound = new tripPage(page);
    await tripRound.createRoundTrip();
    await page.waitForTimeout(4000);
    //await tripRound.addStopage();
    //slide down
    await page.evaluate(() => {
      window.scrollBy(0, 300);
    });
    await tripRound.confirmTrip();
    await page.waitForTimeout(3000);
    await tripRound.checkAndCompleteProfile();
    //await trip.confirmTrip();
    //Assertion for trip created successfully
    await expect(page.locator("#swal2-html-container")).toHaveText(
      "You have ongoing trips. Please complete the trips before starting a new one.",
    );
  });
});
