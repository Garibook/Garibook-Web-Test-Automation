import { test, expect } from "@playwright/test";
import LoginPage from "../../pages/loginPage";
import Profile from "../../pages/ProfilePage";
import { faker } from "@faker-js/faker";
import path from "path";
import fs from "fs";

const CSV_PATH = path.resolve("test-data/mobile-numbers.csv");

// Reads numbers from the CSV (one per row, optional "mobile" header).
function readMobilesFromCsv(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`CSV file not found: ${filePath}`);
  }

  const mobiles = fs
    .readFileSync(filePath, "utf-8")
    .split(/\r?\n/)
    .map((line) => line.split(",")[0].replace(/["'\s]/g, "")) // first column only
    .filter((value) => /^\d+$/.test(value)) // skips header and blank lines
    .map((value) =>
      // Excel drops the leading zero (1312345678) - put it back
      value.length === 10 && value.startsWith("1") ? "0" + value : value,
    );

  if (mobiles.length === 0) {
    throw new Error(`No mobile numbers found in ${filePath}`);
  }
  return mobiles;
}

const mobiles = readMobilesFromCsv(CSV_PATH);

test.describe("Login and complete profile using mobile numbers from CSV", () => {
  for (const mobile of mobiles) {
    test(`Profile Update Successfully - ${mobile}`, async ({ page }) => {
      const login = new LoginPage(page);
      const profile = new Profile(page);

      // 1. Login with the number from CSV
      await page.goto("/");
      await login.getOTP(mobile);
      await login.extractOTPandFill();
      await page.waitForTimeout(2000);

      // 2. Complete profile with Faker data
      const name = faker.person.fullName();
      const dob = faker.date
        .birthdate({ min: 18, max: 65 })
        .toISOString()
        .split("T")[0];
      const email = faker.internet.email();

      await page.goto("/profile");
      await page.waitForTimeout(1000);

      // const image = path.resolve("test-data/profile.jpg");
      // await profile.uploadProfileImage(image);
      await profile.updateProfileDetails(name, dob, email);
      await page.waitForTimeout(2000);

      // 3. Assertion
      await expect(
        page.getByRole("dialog", { name: "Profile Update successfully" }),
      ).toBeVisible();
      await page.getByRole("button", { name: "Close" }).click();
    });
  }
});
