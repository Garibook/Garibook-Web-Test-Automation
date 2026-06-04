const { test } = require("@playwright/test");

test.describe("Manual login + open 100 tabs concurrently", () => {
  test.setTimeout(0);

  test("login and open tabs", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://garibookadmin.com");

    console.log("👉 Please login manually...");

    // Wait for login success
    try {
      await page.waitForSelector("text=Dashboard", { timeout: 0 });
    } catch (e) {
      await page.waitForTimeout(90000);
    }

    console.log("✅ Login successful. Opening 100 tabs concurrently...");

    // ✅ Create 100 tabs concurrently
    const tabPromises = Array.from({ length: 50 }, async (_, i) => {
      const newPage = await context.newPage();
      await newPage.goto("https://garibookadmin.com/all-customer");
      console.log(`Opened tab ${i + 1}`);
      return newPage;
    });

    await Promise.all(tabPromises);

    console.log("🎉 All 20 tabs opened concurrently.");
  });
});
