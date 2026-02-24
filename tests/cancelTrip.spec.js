import { test, expect } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import CancelTrip from "../pages/cancelTrip";
import { getMobile } from "../utils/mobileDataRead";

test("Cancel Trip successfully", async ({ page }) => {
  await page.goto("/");
  const login = new LoginPage(page);
  const mobile = getMobile("mobile2");
  await login.getOTP(mobile);
  // await login.extractOTPandFill();
  await login.getOTPfromManualTyping();
  await page.waitForTimeout(3000);
  await page.goto("/trip/ongoing-bidding");
  const cancel = new CancelTrip(page);
  await cancel.doCancel();
  await page.waitForTimeout(2000);
  await expect(page.locator(".swal2-popup #swal2-title")).toHaveText(
    "Trip Cancellation Successful",
  );
});
