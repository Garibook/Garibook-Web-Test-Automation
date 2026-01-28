// @ts-check
import { test, expect } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import { getMobile } from "../utils/mobileDataRead";
import { log } from "node:console";
test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Garibook - City to City/);
});

test("User should login successfully using OTP", async ({ page }) => {
  const login = new LoginPage(page);
  const mobile = getMobile("mobile3");

  await page.goto("/");
  await login.getOTP(mobile);
  await login.extractOTPandFill();
  await page.waitForTimeout(2000);
  //assert that login was successful
  await expect(page.getByText("Logged In Successfully")).toBeVisible();
});

test("Phone number Validation check with invalid number", async ({ page }) => {
  const login = new LoginPage(page);
  await page.goto("/");
  await login.getOTP("2123344567");
  //assert that login was successful and validation message displayed
  await expect(
    page.getByText("Invalid! Please provide a valid phone number"),
  ).toBeVisible();
});

test("User should not login with invalid OTP", async ({ page }) => {
  const login = new LoginPage(page);
  const mobile = getMobile("mobile3");
  console.log(mobile);
  await page.goto("/");
  await login.getOTP(mobile);
  const otp = "1234";
  for (let i = 0; i < otp.length; i++) {
    await page.fill(`#otp${i + 1}`, otp[i]);
  }
  const continueButton = page.getByRole("button", {
    name: "Continue",
    exact: true,
  });
  // Continue
  await continueButton.click();
  await page.waitForTimeout(3000);
  await expect(
    page.getByText("The OTP you’ve entered is incorrect. Please try again"),
  ).toBeVisible();
});
