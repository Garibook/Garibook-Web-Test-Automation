import { test, expect } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import { getMobile } from "../utils/mobileDataRead";
import { faker } from "@faker-js/faker";
import Profile from "../pages/ProfilePage";
import path from "path";

test("Profile Update Successfully", async ({ page }) => {
  await page.goto("/");
  const login = new LoginPage(page);
  const mobile = getMobile("mobile5");
  const profile = new Profile(page);
  await login.getOTP(mobile);
  // await login.extractOTPandFill();
  await login.getOTPfromManualTyping();
  await page.waitForTimeout(3000);
  const name = faker.person.fullName();
  const dob = faker.date
    .birthdate({ min: 18, max: 65 })
    .toISOString()
    .split("T")[0];
  const email = faker.internet.email();
  await page.goto("/profile");
  await page.waitForTimeout(2000);
  const image = path.resolve("test-data/profile.jpg");
  await profile.uploadProfileImage(image);
  await profile.updateProfileDetails(name, dob, email);
  await page.waitForTimeout(2000);
  await expect(
    page.getByRole("dialog", { name: "Profile Update successfully" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Close" }).click();
});
