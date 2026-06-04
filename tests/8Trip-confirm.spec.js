import { test, expect } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import { getMobile } from "../utils/mobileDataRead";
import { faker } from "@faker-js/faker";
import Profile from "../pages/ProfilePage";
import path from "path";

test("Trip Confirm Successfully", async ({ page }) => {
  await page.goto("/");
  const login = new LoginPage(page);
  const mobile = getMobile("mobile5");
  const profile = new Profile(page);
  await login.getOTP(mobile);
  await login.extractOTPandFill();
  //  await login.getOTPfromManualTyping();

  await page.waitForTimeout(3000);
  await page.goto("/trip/ongoing-bidding");
  await expect(
    page.getByRole("dialog", { name: "Profile Update successfully" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
});
