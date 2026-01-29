import { test, expect } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import { getMobile } from "../utils/mobileDataRead";
import { faker } from "@faker-js/faker";

test("Profile Update Successfully", async ({ page }) => {
  await page.goto("/");
  const login = new LoginPage(page);
  const mobile = getMobile("mobile3");
  const profile = new ProfilePage(page);
  const name = faker.name.fullName();
  const dob = faker.Date.birthdate({ min: 18, max: 65 })
    .toISOString()
    .split("T")[0];
  const email = faker.internet.email();
  await login.getOTP(mobile);
  await login.extractOTPandFill();
  await page.waitForTimeout(3000);
  await page.goto("/profile");
  await page.waitForTimeout(2000);
  await profile.uploadProfileImage("tests/resources/profile.jpg");
  await profile.updateProfileDetails(name, dob, email);
  await page.waitForTimeout(2000);
  await expect(
    page.getByRole("dialog", { name: "Profile Update successfully" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
});
